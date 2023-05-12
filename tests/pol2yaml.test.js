import * as fs from "node:fs/promises";
import { join } from 'node:path';
import {describe, test} from "node:test";

import assertSnapshot from "snapshot-assertion";

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

test("Convert .pol files", async t => {
    const TEST_MATRIX = [
        {name:"Simple policy", key: "simple_policy", pol: TEST_SIMPLE_POL}
    ];

    const pol_dir = './policies/pol/';
    const example_files = await fs.readdir(pol_dir);
    for (const file_name of example_files) {
        if (/.pol$/.test(file_name)) {
            const contents = await fs.readFile(join(pol_dir, file_name));
            TEST_MATRIX.push({name: `Example file ${file_name}`, key: file_name, pol: String(contents)});
        }
    }

    for (const {name, key, pol} of TEST_MATRIX) {
        await t.test(name, async t => {
            const output = new PolicyFile('', pol, false).toYAML();
            await assertSnapshot(output, `tests/${key}.yaml.ref`);
        });
    }
});

test("Convert .inc files", async t => {
    const TEST_MATRIX = [
        {name:"Simple term list", key: "simple_term_list", pol: TEST_SIMPLE_INC},
        {name:"Flexible match term list", key: "flex_match", pol: TEST_JUNIPER_FLEX_MATCH},
        {name:"VPN term list", key: "vpn", pol: TEST_VPN}
    ];

    const pol_dir = './policies/includes/';
    const example_files = await fs.readdir(pol_dir);
    for (const file_name of example_files) {
        if (/.inc$/.test(file_name)) {
            const contents = await fs.readFile(join(pol_dir, file_name));
            TEST_MATRIX.push({name: `Example file ${file_name}`, key: file_name, pol: String(contents)});
        }
    }

    for (const {name, key, pol} of TEST_MATRIX) {
        await t.test(name, async t => {
            const output = new PolicyFile('', pol, true).toYAML();
            await assertSnapshot(output, `tests/${key}.yaml.ref`);
        });
    }
});