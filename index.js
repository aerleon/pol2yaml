#!/usr/bin/env node

"use strict"

import * as fs from 'node:fs';
import { parseArgs } from 'node:util';

import PolicyFile from "./lib/policy.js";
import { exit } from 'node:process';

// const DEFAULT_INPUT_FILENAME = 'policies/includes/untrusted-networks-blocking.inc';
const DEFAULT_INPUT_FILENAME = 'policies/pol/sample_msmpc.pol';
// const DEFAULT_INPUT_FILENAME = 'policies/pol/sample_gcp_hf.pol';
// const DEFAULT_INPUT_FILENAME = 'policies/pol/sample_srx.pol';
// const DEFAULT_INPUT_FILENAME = './policies/pol/sample_k8s.pol';
function pol2yaml(files, options) {
    if (options.help) {
        console.log(`pol2yaml: Convert a .pol or .inc policy file into an equivalent YAML policy file.

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
`)
        exit(0);
    }
    const filename = files[0] ?? DEFAULT_INPUT_FILENAME;
    const is_include = options.type == 'auto' ?
        /.inc$/.test(filename) :
        options.type == 'include';
    const fix_include_names = !options['no-fix-include'];
    const text = fs.readFileSync(filename)?.toString();
    const pf = new PolicyFile(text, { is_include, fix_include_names });
    console.log(pf.toYAML());
}

const parseArgsOptions = {

    'help': {
        type: 'boolean',
        default: false
    },
    'no-fix-include': {
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

pol2yaml(files, options);