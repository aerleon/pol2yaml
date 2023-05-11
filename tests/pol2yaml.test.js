import {describe, test} from "node:test";
import assert from "node:assert";
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

const TEST_SIMPLE_INC_YAML = `terms:
  - name: deny-all
    action: deny
`;

describe("Convert .pol files", () => {
    const TEST_MATRIX = [
        {name:"Simple policy", pol: TEST_SIMPLE_POL, yaml: TEST_SIMPLE_YAML}
    ];
    for (const {name, pol, yaml} of TEST_MATRIX) {
        test(name, t => {
            const output = new PolicyFile('', pol, false).toYAML();
            assert.strictEqual(output, yaml);
        });
    }
});

describe("Convert .inc files", () => {
    const TEST_MATRIX = [
        {name:"Simple term list", pol: TEST_SIMPLE_INC, yaml: TEST_SIMPLE_INC_YAML}
    ];
    for (const {name, pol, yaml} of TEST_MATRIX) {
        test(name, t => {
            const output = new PolicyFile('', pol, true).toYAML();
            assert.strictEqual(output, yaml);
        });
    }
});