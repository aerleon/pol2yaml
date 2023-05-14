#!/usr/bin/env node

"use strict"

import { parseArgs } from 'node:util';

import pol2yaml from './lib/cli.js';


const parseArgsOptions = {

    'help': {
        type: 'boolean',
        default: false
    },
    'no-fix-include': {
        type: 'boolean',
        default: false
    },
    'no-overwrite': {
        type: 'boolean',
        default: false
    },
    'output-directory': {
        type: 'string',
        default: '.'
    },
    'sanity-check': {
        type: 'boolean',
        default: false
    },
    'type': {
        type: 'string',
        default: 'auto'
    }
};
const { values: options, positionals: files } = parseArgs({
    allowPositionals: true,
    options: parseArgsOptions,
    strict: false
});

if (options.help) {
    console.log(`pol2yaml: Convert a .pol or .inc policy file into an equivalent YAML policy file.

Usage: pol2yaml [options] [file | directory]...

Examples:

* Recursively convert all .pol and .inc files in the current directory.
  Original files are left in place. Each YAML files is placed in the same
  directory as the original file.

    npx pol2yaml

* Same as above but for the 'policies' directory.

    npx pol2yaml policies/

* Convert a single file. The output YAML file will be placed in the same
  directory as the input file and named "example.yaml".

    npx pol2yaml policies/pol/example.pol

* Read a single file from stdin, write to stdout. Useful in conjunction
  with command line tools like "find -exec".

    cat policy.pol | npx pol2yaml --type=policy > policy.yaml
    cat terms_include.inc | npx pol2yaml --type=include > terms_include.yaml

Options:

--help              Display this message and exit.

--no-fix-include    By default, if an #include directive references a file
                    name with the .inc extension, the file name will appear
                    in the YAML output with the extension changed to
                    ".yaml". This flag leaves the file name unchanged.

--no-overwrite      Disable overwriting existing YAML files.

--output-directory  Default: current directory. Sets the output directory
                    where YAML files will be placed.

--sanity-check      Run 'aclgen' on both the original and YAML files and
                    ensure the results are identical.

                    Sanity check requires that either Aerleon or pipx
                    are available. To run 'aclgen' it will try each of
                    the following commands in order:

                        python3 -m aerleon

                        python3 -m pipx run aerleon

                        aclgen

--type              Forces the file type to 'policy' or 'include'. Normally
                    the file type is 'policy' unless the file extension is
                    ".inc", in which case it is 'include'. In most cases
                    this flag is not needed unless opening an include file
                    with an extension that is not ".inc" or sending an
                    include file through stdin.
`)
    process.exit(0);
}


pol2yaml(files, options);