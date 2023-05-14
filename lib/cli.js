"use strict"

import { readFileSync, writeFileSync } from 'node:fs';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

import { glob } from 'glob';

import PolicyFile from "./policy.js";

// const DEFAULT_INPUT_FILENAME = 'policies/includes/untrusted-networks-blocking.inc';
// const DEFAULT_INPUT_FILENAME = 'policies/pol/sample_msmpc.pol';
// const DEFAULT_INPUT_FILENAME = 'policies/pol/sample_gcp_hf.pol';
// const DEFAULT_INPUT_FILENAME = 'policies/pol/sample_srx.pol';
// const DEFAULT_INPUT_FILENAME = './policies/pol/sample_k8s.pol';
export default async function pol2yaml(posargs, options) {
    const targets = [];

    // 'stdin' mode is engaged when stdin is non-interactive AND no positional args are present
    // Note this can create a confusing outcome if pol2yaml is invoked with no posargs through a
    // tool that attaches a non-interactive stream to stdin, which was the case for older versions
    // of nodemon. A warning is printed for this reason.
    if (!process.stdin.isTTY && posargs.length === 0) {
        console.warn('WARNING: pol2yaml reading stdin...');
        targets.push({ type: 'stdin' });

    } else if (posargs.length === 0) {
        targets.push({ type: 'dir', path: '.' });

    } else {
        for (const path of posargs) {
            try {
                const stat = await fs.stat(path);
                const type = stat.isDirectory() ? 'dir' : 'file';
                targets.push({ type, path });
            } catch (e) {
                console.warn(`WARNING: pol2yaml could not access "${path}":`);
                console.warn(e.message);
                continue;
            }
        }
    }

    // expand directories
    const expanded_targets = [];
    const paths = new Set();
    for (const target of targets) {
        switch (target.type) {
            default:
            case 'file':
            case 'stdin':
                if (!paths.has(target.path)) {
                    expanded_targets.push(target);
                    paths.add(target.path);
                }
                break;
            case 'dir':
                const files = await glob(
                    path.join(target.path, '**/*.{pol,inc}'),
                    { noDir: true });
                for (const path of files) {
                    if (!paths.has(path)) {
                        expanded_targets.push({ type: 'file', path });
                        paths.add(path);
                    }
                }
                break
        }
    }

    for (const target of expanded_targets) {
        if (target.type === 'file') {
            console.log(`- ${target.type} ${target.path}`);
        }
        const source = target.type === 'stdin' ? process.stdin.fd : target.path;
        let text;
        try {
            // Workaround: as of node 20, the fsPromise interfaces does not provide a way to
            // read from stdin. But fs.readFileSync does support reading from stdin.
            text = readFileSync(source, 'utf-8');
        } catch (e) {
            console.warn(`WARNING: pol2yaml could not access ${target.type} "${target.path ?? ''}":`);
            console.warn(e.message);
            continue;
        }

        let is_include;
        if (options.type !== 'auto') {
            is_include = options.type === 'include';

        } else {
            is_include = target.type !== 'stdin' && /.inc$/.test(target.path);
        }

        const fix_include_names = !options['no-fix-include'];
        const yaml = (new PolicyFile(text, { is_include, fix_include_names })).toYAML();

        // output phase
        // if type == 'stdin' we just write to stdout
        if (target.type === 'stdin') {
            try {
                writeFileSync(process.stdout.fd, yaml);
            } catch (e) {
                console.warn(`WARNING: pol2yaml could not write to stdout:`);
                console.warn(e.message);
                continue;
            }

        } else {
            // check if file exists
            // if yes, and no-overwrite, skip and warn
            // otherwise create directories as needed and write file
            const output_path = path.join(options['output-directory'], target.path).replace(/(\.inc|\.pol)$/, '.yaml');
            const output_dirname = path.dirname(output_path);

            // output_dirname may need to be created, faster to try than to test
            await fs.mkdir(output_dirname, { recursive: true });

            // try writing
            let fhandle;
            try {
                const w_flags = options['no-overwrite'] ? 'wx' : 'w';
                fhandle = await fs.open(output_path, w_flags);
                await fhandle.writeFile(yaml, 'utf-8');

            } catch (e) {
                if (e.code === 'EEXIST' && !!options['no-overwrite']) {
                    console.warn(`WARNING: pol2yaml --no-overwrite will not overwrite existing file "${output_path}"`);
                } else {
                    console.warn(`WARNING: pol2yaml could not write to "${output_path}":`);
                }
                console.warn(e.message);
                continue;

            } finally {
                fhandle?.close();
            }

            // TODO this is where we would kick off sanity check
        }
    }
}
