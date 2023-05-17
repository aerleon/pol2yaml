# pol2yaml

Convert .pol, .inc policy files and .svc, .net definitions into equivalent YAML files.



## Example

Given policy file shown here, "sample_speedway.pol", pol2yaml can convert this to an equivalent YAML file.
```
header {
  comment:: "Sample policy for Speedway Iptables."
  comment:: "Speedway generates iptables output suitable for loading"
  comment:: "using the iptables-restore command"
  target:: speedway INPUT DROP
}
term base-allow-est-in {
  option:: established
  action:: accept
}
term base-allow-icmp-in {
  protocol:: icmp
  icmp-type:: echo-request
  action:: accept
}
term base-traceroute-in {
  protocol:: udp
  source-port:: TRACEROUTE
  destination-port:: HIGH_PORTS
  action:: accept
}
term base-allow-ssh-in {
  source-address:: INTERNAL
  protocol:: tcp
  destination-port:: SSH
  action:: accept
}

header {
  comment:: "Sample output filter policy for Speedway Iptables."
  target:: speedway OUTPUT DROP
}
term base-allow-lo0-out {
  comment:: "Allow all loopback communications"
  verbatim::  speedway "-A OUTPUT -o lo -j ACCEPT"
}
term base-allow-est-out {
  option:: established
  action:: accept
}
term base-allow-dns-query-out {
  protocol:: udp
  destination-port:: DNS
  action:: accept
}
term base-allow-icmp-out {
  protocol:: icmp
  action:: accept
}
term base-traceroute-out {
  protocol:: udp
  destination-port:: TRACEROUTE
  source-port:: HIGH_PORTS
  action:: accept
}
term base-allow-ssh-out {
  destination-address:: INTERNAL
  protocol:: tcp
  destination-port:: SSH
  action:: accept
}

header {
  comment:: "Sample forwarding filter policy for Speedway Iptables."
  target:: speedway FORWARD DROP
}
term base-forwarding-deny {
  action:: reject
}
```

Convert the file with this command. This assumes the file is located in the "./policies" directory.
Use `--base_directory` to change the target directory as needed.
```
$ npx pol2yaml
```

The resulting file "sample_speedway.yaml":
```
filters:
  - header:
      comment: |-
        Sample policy for Speedway Iptables.
        Speedway generates iptables output suitable for loading
        using the iptables-restore command
      targets:
        speedway: INPUT DROP
    terms:
      - name: base-allow-est-in
        option:
          - established
        action: accept
      - name: base-allow-icmp-in
        protocol: icmp
        icmp-type: echo-request
        action: accept
      - name: base-traceroute-in
        protocol: udp
        source-port: TRACEROUTE
        destination-port: HIGH_PORTS
        action: accept
      - name: base-allow-ssh-in
        source-address: INTERNAL
        protocol: tcp
        destination-port: SSH
        action: accept
  - header:
      comment: |-
        Sample output filter policy for Speedway Iptables.
      targets:
        speedway: OUTPUT DROP
    terms:
      - name: base-allow-lo0-out
        comment: |-
          Allow all loopback communications
        verbatim:
          speedway: -A OUTPUT -o lo -j ACCEPT
      - name: base-allow-est-out
        option:
          - established
        action: accept
      - name: base-allow-dns-query-out
        protocol: udp
        destination-port: DNS
        action: accept
      - name: base-allow-icmp-out
        protocol: icmp
        action: accept
      - name: base-traceroute-out
        protocol: udp
        destination-port: TRACEROUTE
        source-port: HIGH_PORTS
        action: accept
      - name: base-allow-ssh-out
        destination-address: INTERNAL
        protocol: tcp
        destination-port: SSH
        action: accept
  - header:
      comment: |-
        Sample forwarding filter policy for Speedway Iptables.
      targets:
        speedway: FORWARD DROP
    terms:
      - name: base-forwarding-deny
        action: reject
```



## FAQ

* ### How can I check that the converted files are correct?

It is a very good idea to test that the converted files produce identical firewall confs
when processed by Aerleon. Use the `--sanity_check` flag to test for correctness. This will run aclgen on both the original policy files (.pol and .inc files) and converted files (.yaml files) and perform a recursive diff to ensure the output is unchanged by the conversion process.

```
$ npx pol2yaml --sanity_check
Converting policies/pol/sample_ipset.pol
Running sanity check...
Running original files through aclgen...
Running YAML files through aclgen...
Comparing aclgen outputs...
Sanity check passed
```

No difference should be found between the aclgen output for the original and converted policy files.

Tip: if you specify `--config_file` for pol2yaml and it will be passed on to aclgen by the sanity checker.

* ### Is rule order preserved within terms?

Rules are ordered within a term or header by order of first appearance in the original term or header. In most cases this preserves the order exactly.

* ### Are file comments preserved?

Yes, file comments placed at the top level (outside of a term or header block) appear in the same position in the YAML file. If a term or header block has file comments inside of it, the whole block is preserved as a comment in the YAML file.

* ### Are file names referenced by #include directives altered?

Yes, if an #include directive references a file name with the ".inc" extension, the file name will appear in the YAML output with the extension changed to ".yaml". You can disable this behavior with the `--no_fix_includes` flag.

* ### Can this convert multiple files at a time?

Yes, this will convert all .pol and .inc files found in the directory given by `--base_directory` (default is "./policies"). Each generated file will be placed in the same directory as its input file unless `--output_directory` is given.

## Usage

```
pol2yaml: Convert .pol, .inc policy files and .svc, .net definitions into equivalent YAML files.

Usage: pol2yaml [--base_directory DIRECTORY] [-c|--config_file FILE] [--definitions_directory DIRECTORY]
    [-h|--help] [--no-fix-include] [--output_directory DIRECTORY] [-s|--sanity_check]

Examples:

* Recursively convert all .pol and .inc files in base_directory.
  Original files are left in place. Each YAML files is placed in the same
  directory as the original file. Run sanity_check after (-s).

    npx pol2yaml -s --base_directory policies/


Options:

--base_directory    Convert .pol and .inc files found in this directory to
                    YAML. Original files are left in place. Can be set in
                    the 'aerleon.yml' config file.

--config_file | -c  Defaults to 'aerleon.yml'. Can set base_directory and
                    definitions_directory.

--definitions_directory
                    Convert .net and .svc files found in this directory to
                    YAML. Original files are left in place. Can be set in
                    the 'aerleon.yml' config file.

--help | -h         Display this message and exit.

--no_fix_include    By default, if an #include directive references a file
                    name with the .inc extension, the file name will appear
                    in the YAML output with the extension changed to
                    ".yaml". This flag leaves the file name unchanged.

--output_directory  Default: current directory. Sets the output directory
                    where YAML files will be placed.

--sanity_check | -s Run 'aclgen' on both the original and YAML files and
                    ensure the results are identical.

                    Sanity check requires that either Aerleon or pipx
                    are available. To run 'aclgen' it will try each of
                    the following commands in order:

                        python3 -m aerleon

                        python3 -m pipx run aerleon

                        aclgen
```

## Programmatic Usage

A JavaScript interface is available with the same capabilities as the command line script.

```javascript
// Use PolicyFile to convert .pol and .inc files
import { PolicyFile } from "pol2yaml";


// original policy file text.
const text = '';
// set to 'true' if this is an include file (not a complete policy file).
const is_include = false;
// set to 'false' to disable adjusting file name extensions - see --no-fix-include .
const fix_include_names = true;

// the converted file text
const yaml = (new PolicyFile(text, { is_include, fix_include_names })).toYAML();


// Use DefinitionFile to convert .net and .svc files
import { DefinitionFile, DefinitionFileType } from "pol2yaml";

const text = '';
// set according to the input file type
const type = DefinitionFileType.NET; // or DefinitionFileType.SVC

// the converted file text
const yaml = (new DefinitionFile(text, type)).toYAML();

```
