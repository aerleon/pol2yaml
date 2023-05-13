# pol2yaml

Convert a .pol or .inc policy file into an equivalent YAML policy file.



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

Convert the file with this command:
```
$ npx pol2yaml sample_speedway.pol > sample_speedway.yaml
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
when processed by Aerleon. You can do this manually or use the provided `scripts/sanitycheck.sh` script like so:

```
$ ./scripts/sanitycheck.sh -b path/to/base_dir/
[SanityCheck] Converting contents of policies/ to YAML with pol2yaml...
[SanityCheck] Running aclgen on converted policy files..
[SanityCheck] Running aclgen on original policy files...
[SanityCheck] Diffing generated configs...
[SanityCheck] Done
```

No difference should be found between the aclgen output for the original and converted policy files.

* ### Is rule order preserved within terms?

Rules are ordered within a term or header by order of first appearance in the original term or header. In most cases this preserves the order exactly.

* ### Are file comments preserved?

Yes, file comments placed at the top level (outside of a term or header block) appear in the same position in the YAML file. If a term or header block has file comments inside of it, the whole block is preserved as a comment in the YAML file.

* ### Are file names referenced by #include directives altered?

Yes, if an #include directive references a file name with the ".inc" extension, the file name will appear in the YAML output with the extension changed to ".yaml". You can disable this behavior with the `--no-fix-includes` flag.



## Usage

```
pol2yaml: Convert a .pol or .inc policy file into an equivalent YAML policy file.

Usage: pol2yaml [options] file

Examples:

    npx pol2yaml policy.pol > policy.yaml
    npx pol2yaml terms_include.inc > terms_include.yaml

Options:

    --help              Display this message and exit.

    --no-fix-include    By default, if an #include directive references a file
                        name with the .inc extension, the file name will appear
                        in the YAML output with the extension changed to
                        ".yaml". This flag leaves the file name unchanged.

    --type              Default 'auto'. Options include 'auto', 'policy',
                        'include'. Specify whether the input is a full
                        policy file ('policy') or a partial file ('include').
                        When set to 'auto' the file extension will be used
                        to determine the type.
```

## Programmatic Usage

A JavaScript interface is available with the same capabilities as the command line script.

```javascript
import PolicyFile from "pol2yaml";


// original policy file text.
const text = '';
// set to 'true' if this is an include file (not a complete policy file).
const is_include = false;
// set to 'false' to disable adjusting file name extensions - see --no-fix-include .
const fix_include_names = true;

// the converted file text
const yaml = (new PolicyFile(text, { is_include, fix_include_names })).toYAML();

```