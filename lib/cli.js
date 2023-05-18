"use strict"

import * as fs from 'node:fs/promises';
import * as path from 'node:path';

import { glob } from 'glob';

import loadConfig from './config.js';
import DefinitionFile, { DefinitionFileType } from './defs.js';
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
    const config = await loadConfig(config_file);
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
        await sanity_checker.setupTmpdir();
    }

    let exit_code = 0;

    try {
        await pol2yamlInner({
            base_directory,
            definitions_directory,
            no_fix_include,
            output_directory
        }, sanity_checker);

        if (sanity_check) {
            console.log('Running sanity check...');
            exit_code = await sanity_checker.runChecks({ config_file });
        }
    } finally {
        if (sanity_check) {
            await sanity_checker.close();
        }
    }

    return exit_code;
}

async function pol2yamlInner({
    base_directory,
    definitions_directory,
    no_fix_include,
    output_directory
}, sanity_checker) {

    // expand base_directory
    const expanded_targets = [];
    {
        const paths = new Set();
        const files = [];

        let root = 'policies';
        files.push(...await glob(
            path.join(base_directory, '**/*.{pol,inc}'),
            { noDir: true }));
        for (const path of files) {
            if (!paths.has(path)) {
                expanded_targets.push({ type: 'file', root, path });
                paths.add(path);
            }
        }

        root = 'def';
        files.push(...await glob(
            path.join(definitions_directory, '**/*.{net,svc}'),
            { noDir: true }));
        for (const path of files) {
            if (!paths.has(path)) {
                expanded_targets.push({ type: 'file', root, path });
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

        if (sanity_checker) {

            sanity_checker.writeFile(target.root, path.relative(
                target.root === 'def' ? definitions_directory : base_directory,
                target.path),
                text);
        }


        try {
            const extname = path.extname(target.path);
            switch (extname) {
                case '.inc':
                case '.pol':
                    const is_include = '.inc' === extname;
                    const fix_include_names = !no_fix_include;
                    target.yaml = (new PolicyFile(text, { is_include, fix_include_names })).toYAML();
                    break;
                case '.net':
                case '.svc':
                    const type = '.net' === extname ? DefinitionFileType.NET : DefinitionFileType.SVC;
                    target.yaml = (new DefinitionFile(text, type)).toYAML();
                    break;
            }

        } catch (e) {
            console.warn(`WARNING: pol2yaml failed to parse "${target.path}"`);
            // e.message is not very helpful, antlr4 parser already generates warning lines
            if (sanity_checker) {
                sanity_checker.addError(ErrorStage.PARSE, target.path, e);
            }
            continue;
        }

        // output phase
        {
            const output_path = path.join(output_directory, target.path).replace(/(\..*)$/, '.yaml');
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
                if (sanity_checker) {
                    sanity_checker.addError(ErrorStage.WRITE_FILE, target.path, e);
                }
                continue;

            } finally {
                fhandle?.close();
            }

            if (sanity_checker) {
                sanity_checker.writeOutput(target.root, path.relative(
                    target.root === 'def' ? definitions_directory : base_directory,
                    target.path).replace(/(\..*)$/, '.yaml'),
                    target.yaml);
            }
        }
    }
}
