import * as fs from "node:fs/promises";
import { join } from 'node:path';
import { test } from "node:test";

import assertSnapshot from "snapshot-assertion";

import DefinitionFile, { DefinitionFileType } from "../lib/defs.js";
import PolicyFile from "../lib/policy.js";


const TEST_SIMPLE_POL = `
header {
    target:: srx from-zone A to-zone B
}

term deny-all {
    action:: deny
}`;

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
        { name: "Simple policy", key: "test_simple_policy.pol", pol: TEST_SIMPLE_POL }
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
});

test("Convert .inc files", async t => {
    const TEST_MATRIX = [
        { name: "Simple term list", key: "test_simple_term_list.inc", pol: TEST_SIMPLE_INC },
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
MAIL_SERVICES = SMTP
                ESMTP
                SMTP_SSL
                POP_SSL
TIME = 37/tcp 37/udp
TACACS = 49/tcp
DNS = 53/tcp 53/udp
BOOTPS = 67/udp   # BOOTP server
BOOTPC = 68/udp   # BOOTP client
`;

test("Convert .svc files", async t => {
    const TEST_MATRIX = [
        { name: "Service file", key: "test_services.svc", src: TEST_SERVICES_SVC }
    ];

    for (const { name, key, src } of TEST_MATRIX) {
        await t.test(name, async t => {
            const output = new DefinitionFile(src, DefinitionFileType.SVC).toYAML();
            await assertSnapshot(output, `tests/${key}.yaml.ref`);
        });
    }
});