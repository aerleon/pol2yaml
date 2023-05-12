"use strict"

import * as fs from 'node:fs';
import { parseArgs } from 'node:util';

import PolicyFile from "./lib/policy.js";

// const DEFAULT_INPUT_FILENAME = 'policies/includes/untrusted-networks-blocking.inc';
const DEFAULT_INPUT_FILENAME = 'policies/pol/sample_msmpc.pol';
// const DEFAULT_INPUT_FILENAME = 'policies/pol/sample_gcp_hf.pol';
// const DEFAULT_INPUT_FILENAME = 'policies/pol/sample_srx.pol';
// const DEFAULT_INPUT_FILENAME = './policies/pol/sample_k8s.pol';
function pol2yaml(files, options) {
    const filename = files[0] ?? DEFAULT_INPUT_FILENAME;
    const is_include = /.inc$/.test(filename);
    const fix_include_names = !options['no-fix-include'];
    const text = fs.readFileSync(filename)?.toString();
    const pf = new PolicyFile(text, { is_include, fix_include_names });
    console.log(pf.toYAML());
}

const parseArgsOptions = {
    'no-fix-include': {
        type: 'boolean',
        default: false
    }
};
const { values: options, positionals: files } = parseArgs({ options: parseArgsOptions, allowPositionals: true });
pol2yaml(files, options);