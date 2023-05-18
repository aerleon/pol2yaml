// See lib/config.py in Aerleon
//
// first, start with default values
// then read --config_file or aerleon.yml
// then overwrite CLI values (--base_directory, --definitions_directory)
import { readFile } from 'node:fs/promises';

import { parse } from 'yaml'

const DEFAULT_CONFIG_FILE = './aerleon.yml';
const DEFAULTS = {
    'base_directory': './policies',
    'definitions_directory': './def',
}

export default async function loadConfig(config_file) {
    const config_data = { ...DEFAULTS };

    if (config_file) {
        // crash if config_file was given but could not be read or parsed
        const yaml = await readFile(config_file, 'utf-8');
        Object.assign(config_data, parse(yaml));

    } else {
        try {
            const yaml = await readFile(DEFAULT_CONFIG_FILE, 'utf-8');
            Object.assign(config_data, parse(yaml));
        } catch (e) {
            if (e.code !== 'ENOENT') {
                throw e;
            }
            // proceed
        }
    }

    return config_data;
}