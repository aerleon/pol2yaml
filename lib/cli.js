"use strict"

import * as fs from 'node:fs/promises';
import * as path from 'node:path';

import { glob } from 'glob';

import load_config from './config.js';
import PolicyFile from "./policy.js";
import SanityCheck, { ErrorStage } from './sanity_check.js';


export default async function pol2yaml(_posargs, options) {
    // _posargs are unused
    if (_posargs) {
        for (const arg of _posargs) {
            console.warn('WARNING: pol2yaml ignoring extra input:', arg);
        }
    }

    const { config_file } = options;
    const config = await load_config(config_file);
    const {
        base_directory = config.base_directory,
        definitions_directory = config.definitions_directory,
        no_fix_include,
        output_directory = '.',
        sanity_check
    } = options;

    // set up sanitycheck
    let sanity_checker;
    if (sanity_check) {
        sanity_checker = new SanityCheck();
        await sanity_checker.create_tmpdir();
    }

    // expand base_directory
    const expanded_targets = [];
    {
        const paths = new Set();
        const files = await glob(
            path.join(base_directory, '**/*.{pol,inc}'),
            { noDir: true });
        for (const path of files) {
            if (!paths.has(path)) {
                expanded_targets.push({ type: 'file', path });
                paths.add(path);
            }
        }
    }

    for (const target of expanded_targets) {
        console.log(`Converting ${target.path}`);
        let text;
        try {
            text = await fs.readFile(target.path, 'utf-8');
            target.text = text;
        } catch (e) {
            console.warn(`WARNING: pol2yaml could not access ${target.type} "${target.path ?? ''}":`);
            console.warn(e.message);
            continue;
        }

        if (sanity_check) {
            sanity_checker.writeFile(path.relative(base_directory, target.path), text);
        }

        const is_include = /.inc$/.test(target.path);
        const fix_include_names = !no_fix_include;

        try {
            target.yaml = (new PolicyFile(text, { is_include, fix_include_names })).toYAML();

        } catch (e) {
            console.warn(`WARNING: pol2yaml failed to parse "${target.path}"`);
            // e.message is not very helpful, antlr4 parser already generates warning lines
            if (sanity_check) {
                sanity_checker.addError(ErrorStage.PARSE, target.path, e);
            }
            continue;
        }

        // output phase
        {
            const output_path = path.join(output_directory, target.path).replace(/(\.inc|\.pol)$/, '.yaml');
            const output_dirname = path.dirname(output_path);

            // output_dirname may need to be created, faster to try than to test
            await fs.mkdir(output_dirname, { recursive: true });

            // try writing
            let fhandle;
            try {
                fhandle = await fs.open(output_path, 'w');
                await fhandle.writeFile(target.yaml, 'utf-8');

            } catch (e) {
                console.warn(`WARNING: pol2yaml could not write to "${output_path}":`);
                console.warn(e.message);
                if (sanity_check) {
                    sanity_checker.addError(ErrorStage.WRITE_FILE, target.path, e);
                }
                continue;

            } finally {
                fhandle?.close();
            }

            if (sanity_check) {
                sanity_checker.writeOutput(path.relative(base_directory, target.path).replace(/(\.inc|\.pol)$/, '.yaml'), target.yaml);
            }
        }
    }

    let code = 0;
    if (sanity_check) {
        console.log('Running sanity check...');
        code = await sanity_checker.runChecks({definitions_directory, config_file});
        // TODO move sanity_checker setup outside of this function so we can more reliably do try-finally (close)
        await sanity_checker.close();
    }
    return code;
}
