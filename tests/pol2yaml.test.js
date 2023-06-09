import * as fs from "node:fs/promises";
import { join } from 'node:path';
import { test } from "node:test";

import assertSnapshot from "snapshot-assertion";

import DefinitionFile, { DefinitionFileType } from "../lib/defs.js";
import PolicyFile, { PolicyFormatOptions } from "../lib/policy.js";


const TEST_SIMPLE_POL = `
header {
    target:: srx from-zone A to-zone B
}

term deny-all {
    action:: deny
}`;

const TEST_POL_WITH_LISTS = `
header {
    target:: paloalto from-zone internal to-zone external
    target:: srx from-zone internal to-zone external
    option:: tcp-established
}

term test-tcp-udp-many-mixed {
    comment:: "Testing mixed IPv4 and IPv6 IPs to test address books."
    source-address:: MANY_IPV4 MANY_IPV6
    destination-address:: MANY_IPV4 MANY_IPV6
    protocol:: tcp udp
    action:: accept
}
`;

const TEST_SIMPLE_INC = `
term deny-all {
    action:: deny
}`;

const TEST_JUNIPER_FLEX_MATCH = `
term flex-match-term-1 {
  protocol:: tcp
  flexible-match-range:: bit-length 8
  flexible-match-range:: range 0x08
  flexible-match-range:: match-start payload
  flexible-match-range:: byte-offset 16
  flexible-match-range:: bit-offset 7
  action:: deny
}
`;

const TEST_VPN = `
term vpn-term-1 {
    destination-address:: SOME_HOST
    protocol:: tcp
    action:: accept
    vpn:: good-vpn-4 policy-4
}

term vpn-term-2 {
    destination-address:: SOME_HOST
    protocol:: tcp
    action:: accept
    vpn:: good-vpn-3
}
`;

const TEST_INCLUDE = `
#include path/to/file.inc
`;

test("Convert .pol files", async t => {
    const TEST_MATRIX = [
        { name: "Simple policy", key: "test_policy.simple.pol", pol: TEST_SIMPLE_POL }
    ];

    const pol_dir = './policies/pol/';
    const example_files = await fs.readdir(pol_dir);
    for (const file_name of example_files) {
        if (/.pol$/.test(file_name)) {
            const contents = await fs.readFile(join(pol_dir, file_name));
            TEST_MATRIX.push({ name: `Example file ${file_name}`, key: file_name, pol: String(contents) });
        }
    }

    for (const { name, key, pol } of TEST_MATRIX) {
        await t.test(name, async t => {
            const output = new PolicyFile(pol, { is_include: false }).toYAML();
            await assertSnapshot(output, `tests/${key}.yaml.ref`);
        });
    }

    await t.test("no_collapse flag", async t => {
        // Regardless of format_list setting:
        // target must always be collapsed
        // option must always be splayed (even for a single option)
        const output_replace = new PolicyFile(TEST_POL_WITH_LISTS, { is_include: false }).toYAML();
        await assertSnapshot(output_replace, `tests/test_pol_collapse.yaml.ref`);
        const output_noreplace = new PolicyFile(TEST_POL_WITH_LISTS, { is_include: false, format_lists: PolicyFormatOptions.LISTS_SPLAY }).toYAML();
        await assertSnapshot(output_noreplace, `tests/test_pol_splay.yaml.ref`);
    })
});

test("Convert .inc files", async t => {
    const TEST_MATRIX = [
        { name: "Simple term list", key: "test_term_list.simple.inc", pol: TEST_SIMPLE_INC },
        { name: "Flexible match term list", key: "test_flex_match.inc", pol: TEST_JUNIPER_FLEX_MATCH },
        { name: "VPN term list", key: "test_vpn.inc", pol: TEST_VPN }
    ];

    const pol_dir = './policies/includes/';
    const example_files = await fs.readdir(pol_dir);
    for (const file_name of example_files) {
        if (/.inc$/.test(file_name)) {
            const contents = await fs.readFile(join(pol_dir, file_name));
            TEST_MATRIX.push({ name: `Example file ${file_name}`, key: file_name, pol: String(contents) });
        }
    }

    for (const { name, key, pol } of TEST_MATRIX) {
        await t.test(name, async t => {
            const output = new PolicyFile(pol, { is_include: true }).toYAML();
            await assertSnapshot(output, `tests/${key}.yaml.ref`);
        });
    }

    await t.test("#include extension replacement", async t => {
        const output_replace = new PolicyFile(TEST_INCLUDE, { is_include: true, fix_include_names: true }).toYAML();
        await assertSnapshot(output_replace, `tests/test_inc_replace.yaml.ref`);
        const output_noreplace = new PolicyFile(TEST_INCLUDE, { is_include: true, fix_include_names: false }).toYAML();
        await assertSnapshot(output_noreplace, `tests/test_inc_noreplace.yaml.ref`);
    })
});


const TEST_SERVICES_SVC = `
#
# Sample naming service definitions
#
WHOIS = 43/udp
SSH = 22/tcp
TELNET = 23/tcp
SMTP = 25/tcp
# Inter-unit comment
MAIL_SERVICES = SMTP
                ESMTP
# Intra-unit comment
                SMTP_SSL
                POP_SSL
TIME = 37/tcp 37/udp
TACACS = 49/tcp
DNS = 53/tcp 53/udp
BOOTPS = 67/udp   # BOOTP server
BOOTPC = 68/udp   # BOOTP client

# End of file comment
`;

test("Convert .svc/.net files", async t => {
    const TEST_MATRIX = [
        { name: "Service file", key: "test_services.svc", src: TEST_SERVICES_SVC }
    ];

    const defs = './def/';
    const example_files = await fs.readdir(defs);
    for (const file_name of example_files) {
        if (/\.(net|svc)$/.test(file_name)) {
            const contents = await fs.readFile(join(defs, file_name));
            TEST_MATRIX.push({ name: `Example file ${file_name}`, key: file_name, src: String(contents) });
        }
    }
    for (const { name, key, src } of TEST_MATRIX) {
        await t.test(name, async t => {
            const type = /\.net$/.test(key) ? DefinitionFileType.NET : DefinitionFileType.SVC;
            const output = new DefinitionFile(src, type).toYAML();
            await assertSnapshot(output, `tests/${key}.yaml.ref`);
        });
    }
});