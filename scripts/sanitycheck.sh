#!/bin/bash

# sanitycheck.sh
# Run aerleon on pol2yaml output and confirm the generated confs are identical pre- and post-conversion.
#
# Assumes your system has python3, pip, pipx, venv, and nodejs installed.
# If you are using the Docker devcontainer for this project you will need to install pip and pipx:
# sudo apt install -y python3-pip python3-venv
# python3 -m pip install --user pipx
#

base_dir=.
verbose=false

while getopts b:v flag
do
    case "${flag}" in
        b) base_dir=${OPTARG};;
        v) verbose=true;;
    esac
done

if [ "$base_dir" != "." ] ; then
    cd "$base_dir"
fi

tmpdir=$(mktemp -d 2>/dev/null || mktemp -d -t 'tmpdir')
pol_dir="$tmpdir/pol_output/"
yaml_dir="$tmpdir/yaml_output/"
conv_dir="$tmpdir/conv/"

mkdir $pol_dir
mkdir $yaml_dir
mkdir $conv_dir
mkdir -p "$conv_dir/policies/includes/"
mkdir -p "$conv_dir/policies/pol/"
mkdir -p "$conv_dir/def/"

echo "[SanityCheck] Converting contents of policies/ to YAML with pol2yaml..."

find policies/ -name *.inc -exec sh -c "dirname \"\$1\" | xargs -0 -n1 printf \"$conv_dir%s\" | xargs -n1 mkdir -p; node index.js \$1 > \"$conv_dir\${1%.inc}.yaml\"" _ {} \;
find policies/ -name *.pol -exec sh -c "dirname \"\$1\" | xargs -0 -n1 printf \"$conv_dir%s\" | xargs -n1 mkdir -p; node index.js \$1 > \"$conv_dir\${1%.pol}.yaml\"" _ {} \;
cp -R def/ "$conv_dir/"

pushd $conv_dir >/dev/null

echo "[SanityCheck] Running aclgen on converted policy files.."
OUT=$( { python3 -m pipx run --spec aerleon aclgen --output_directory $yaml_dir || true ; } 2>&1 )

if [ "$verbose" = true ] ; then
    echo "$OUT"
fi

popd > /dev/null

echo "[SanityCheck] Running aclgen on original policy files..."

OUT=$( { python3 -m pipx run --spec aerleon aclgen --output_directory $pol_dir || true ; } 2>&1 )

if [ "$verbose" = true ] ; then
    echo "$OUT"
fi

echo "[SanityCheck] Diffing generated configs..."

diff -r $yaml_dir $pol_dir

rm -Rf $tmpdir

echo "[SanityCheck] Done"