import { execFile as execFileInner } from 'node:child_process';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import * as os from "node:os";
import * as path from 'node:path';
import { promisify } from 'node:util';

const execFile = promisify(execFileInner);

import Enum from './enum.js';

class SanityCheckState extends Enum {
    static INIT = new SanityCheckState('INIT')
    static READY = new SanityCheckState('READY')
    static CLOSED = new SanityCheckState('CLOSED')
}

export class ErrorStage extends Enum {
    static READ_FILE = new ErrorStage('READ_FILE')
    static PARSE = new ErrorStage('PARSE')
    static WRITE_FILE = new ErrorStage('WRITE_FILE')
}

export default class SanityCheck {
    state = SanityCheckState.INIT;
    errors = null;
    paths = null;
    aerleon_command = null;

    constructor() {
        this.errors = [];
        this.paths = {};
    }

    async setupTmpdir() {
        const tmpdir = this.paths.tmpdir = await mkdtemp(path.join(os.tmpdir(), 'pol2yaml-'));
        this.paths.input_pol_orig = path.join(tmpdir, 'policies_original/');
        this.paths.input_pol_conv = path.join(tmpdir, 'policies_conv/');
        this.paths.input_def_orig = path.join(tmpdir, 'policies_original/');
        this.paths.input_def_conv = path.join(tmpdir, 'policies_conv/');
        this.paths.output_orig = path.join(tmpdir, 'output_original/');
        this.paths.output_conv = path.join(tmpdir, 'output_conv/');

        for (const path in this.paths) {
            await mkdir(this.paths[path], { recursive: true });
        }

        this.state = SanityCheckState.READY;
    }

    async writeFile(root, rel_path, text) {
        const root_path = root === 'def' ? this.paths.input_def_orig : this.paths.input_pol_orig;
        const file_path = path.join(root_path, rel_path);
        await mkdir(path.dirname(file_path), { recursive: true });
        await writeFile(file_path, text);
    }

    addError(stage, path, error) {
        this.errors.push({ stage, path, error });
    }

    async writeOutput(root, rel_path, yaml) {
        const root_path = root === 'def' ? this.paths.input_def_conv : this.paths.input_pol_conv;
        const file_path = path.join(root_path, rel_path);
        await mkdir(path.dirname(file_path), { recursive: true });
        await writeFile(file_path, yaml);
    }

    async _runAclgen(aclgen_argv) {
        // We will try various ways to execute aerleon's aclgen script.
        // Aclgen itself will exit with code=1 if errors were encountered, so we must carefully
        // distinguish the ENOENT and "module not found" scenarios from the Aclgen error scenario.
        // Fortunately NodeJS (libuv) ensures a consistent cross-platform error for the ENOENT case [1].
        // [1] https://github.com/nodejs/node/blob/a51491ab24d195a7c7c2a68e18baff83d4714a0e/test/parallel/test-child-process-spawn-error.js#L49-L55
        //
        // SanityCheck will run Aerleon multiple times, so we can make a note of which invocation was successful

        const aclgen_commands = [
            () => execFile('python3', ['-m', 'aerleon', ...aclgen_argv]),
            () => execFile('python3', ['-m', 'pipx', 'run', 'aerleon', ...aclgen_argv]),
            () => execFile('python3', ['-m', 'pipx', 'run', '--spec', 'aerleon', 'aclgen', ...aclgen_argv]),
            () => execFile('aclgen', aclgen_argv),
            () => execFile('python', ['-m', 'aerleon', ...aclgen_argv]),
            () => execFile('python', ['-m', 'pipx', 'run', 'aerleon', ...aclgen_argv]),
            () => execFile('python', ['-m', 'pipx', 'run', '--spec', 'aerleon', 'aclgen', ...aclgen_argv]),
        ];

        let stdout, stderr, code;
        if (this.aerleon_command) {
            try {
                ({ stdout, stderr } = await aclgen_commands[this.aerleon_command]());

            } catch (e) {
                ({ stdout, stderr, code } = e);
            }
            return { stdout, stderr, code };
        } else {
            for (const i in aclgen_commands) {
                const command = aclgen_commands[i];
                try {
                    ({ stdout, stderr } = await command());
                    this.aerleon_command = i;
                    return { stdout, stderr };

                } catch (e) {
                    // If the command or module was not found, or the module is a non-executable package,
                    // move on to the next command.
                    // If aclgen actually ran but failed with error, move forward.

                    if (/^spawn/.test(e.syscall) && e.code == 'ENOENT') {
                        // command not found, proceed through command list
                        continue;

                    } else if (/^python/.test(e.cmd) && /No module named/.test(e.stderr)) {
                        // python module not found, proceed through command list
                        continue;

                    } else if (/^python/.test(e.cmd) && /cannot be directly executed/.test(e.stderr)) {
                        // python -m tried to run non-executable package
                        continue;

                    } else if (/^python/.test(e.cmd) && /executable script not found in package/.test(e.stderr)) {
                        // pipx tried to run non-executable package
                        continue;
                    }

                    // aclgen ran (we think), move forward
                    ({ stdout, stderr, code } = e);
                    this.aerleon_command = i;
                    return { stdout, stderr, code };
                }
            }
            // if we got here, none of our commands successfully ran aclgen
            throw new Error("Sanity check failed: Aerleon not installed. Retry with pypi package 'aerleon'. Or install package 'pipx'.")
        }
    }

    async runChecks({ config_file }) {

        // First we want to run aclgen on the input/pol directory and write to output/pol
        let aclgen_argv = [
            '--base_directory', this.paths.input_pol_orig,
            '--output_directory', this.paths.output_orig,
            '--definitions_directory', this.paths.input_def_orig,
        ];
        if (config_file) {
            aclgen_argv.push('--config_file', config_file);
        }
        console.log('Running original files through aclgen...');
        await this._runAclgen(aclgen_argv);

        // it's possible that the .pol corpus contained errors - OK to ignore. Most likely
        // we encountered a similar error when running pol2yaml, and that will be reported to the user.

        // Second, we want to run aclgen on the input/yaml directory and write to output/yaml
        aclgen_argv = [
            '--base_directory', this.paths.input_pol_conv,
            '--output_directory', this.paths.output_conv,
            '--definitions_directory', this.paths.input_def_conv,
        ];
        if (config_file) {
            aclgen_argv.push('--config_file', config_file);
        }
        console.log('Running YAML files through aclgen...');
        await this._runAclgen(aclgen_argv);


        // the .yaml corpus may also contain errors. pol2yaml does not thoroughly test the .pol input,
        // instead if focuses on conversion as-is. For example, if a .pol file has a dangling #include,
        // pol2yaml will produce a .yaml file with a dangling #include.
        // The key thing is that the final output be identical.

        let stdout = '';
        try {
            console.log('Comparing aclgen outputs...');
            await execFile('diff', ['-r', this.paths.output_orig, this.paths.output_conv]);
        } catch (e) {
            if (/^spawn/.test(e.syscall) && e.code == 'ENOENT') {
                // if diff is not found, inform the user
                console.warn('Sanity check failed: diff command not found');
                throw e;
            }
            ({ stdout } = e);
        }

        // summarize results
        if (stdout.length) {
            console.log('Sanity check failed: pre- and post-conversion outputs differ');
            console.log(stdout);
        } else {
            console.log('Sanity check passed');
        }
        return Boolean(this.errors.length || stdout.length);
    }

    async close() {
        await rm(this.paths.tmpdir, { recursive: true, force: true })
    }
}
