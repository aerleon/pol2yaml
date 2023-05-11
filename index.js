"use strict"

import * as fs from 'node:fs';

import PolicyFile from "./lib/policy.js";

// const DEFAULT_INPUT_FILENAME = 'policies/includes/untrusted-networks-blocking.inc';
// const DEFAULT_INPUT_FILENAME = 'policies/pol/sample_multitarget.pol';
// const DEFAULT_INPUT_FILENAME = 'policies/pol/sample_gcp_hf.pol';
// const DEFAULT_INPUT_FILENAME = 'policies/pol/sample_srx.pol';
const DEFAULT_INPUT_FILENAME = './policies/pol/sample_k8s.pol';
function pol2yaml(argv) {
    const filename = argv[2] ?? DEFAULT_INPUT_FILENAME;
    const is_include = /.inc$/.test(filename);
    const text = fs.readFileSync(filename)?.toString();
    const pf = new PolicyFile(filename, text, is_include);
    console.log(pf.toYAML());
}

pol2yaml(process.argv);