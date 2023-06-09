#!/usr/bin/env node

"use strict"

import { parseArgs } from 'node:util';

import pol2yaml from './lib/cli.js';


const parseArgsOptions = {

    'base_directory': {
        type: 'string',
        default: undefined
    },
    'config_file': {
        type: 'string',
        short: 'c',
        default: undefined
    },
    'definitions_directory': {
        type: 'string',
        default: undefined
    },
    'help': {
        type: 'boolean',
        short: 'h',
        default: false
    },
    'no_collapse': {
        type: 'boolean',
        default: false
    },
    'no_fix_include': {
        type: 'boolean',
        default: false
    },
    'output_directory': {
        type: 'string',
        default: undefined
    },
    'sanity_check': {
        type: 'boolean',
        short: 's',
        default: false
    }
};
const { values: options, positionals: files } = parseArgs({
    allowPositionals: true,
    options: parseArgsOptions,
    strict: false
});

if (options.help) {
    console.log(`pol2yaml: Convert .pol, .inc policy files and .svc, .net definitions into equivalent YAML files.

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

--no_collapse       By default, lists will be formatted as space-separated
                    values on the same line as much as possible. This option
                    disables this behavior and causes lists to always appear
                    with one item per line.

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
`)
    process.exit(0);
}


const code = await pol2yaml(files, options);
process.exit(code);