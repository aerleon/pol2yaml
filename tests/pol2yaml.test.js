import {describe, test} from "node:test";
import assert from "node:assert";

import assertSnapshot from "snapshot-assertion";

import PolicyFile from "../lib/policy.js";


const TEST_SIMPLE_POL = `
header {
    target:: srx from-zone A to-zone B
}

term deny-all {
    action:: deny
}`;

const TEST_SIMPLE_YAML = `filters:
  - header:
      target:
        srx: from-zone A to-zone B
    terms:
      - name: deny-all
        action: deny
`;

const TEST_SIMPLE_INC = `
term deny-all {
    action:: deny
}`;

describe("Convert .pol files", () => {
    const TEST_MATRIX = [
        {name:"Simple policy", key: "simple_policy", pol: TEST_SIMPLE_POL}
    ];
    for (const {name, key, pol} of TEST_MATRIX) {
        test(name, async t => {
            const output = new PolicyFile('', pol, false).toYAML();
            await assertSnapshot(output, `tests/${key}.yaml.ref`);
        });
    }
});

describe("Convert .inc files", () => {
    const TEST_MATRIX = [
        {name:"Simple term list", key: "simple_term_list", pol: TEST_SIMPLE_INC}
    ];
    for (const {name, key, pol} of TEST_MATRIX) {
        test(name, async t => {
            const output = new PolicyFile('', pol, true).toYAML();
            await assertSnapshot(output, `tests/${key}.yaml.ref`);
        });
    }
});