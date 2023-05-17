// Load a definitions file (.net or .svc) and expose toYAML
// parallel to policy.js

import { Document } from "yaml";

// Definition files are simple line-by-line config files. Each line
// either starts a new definition (and may carry data) or attaches data
// to the previous line.
//
// There is a little complexity in the odd comment attachment scheme
// (or more like comment duplication scheme) - comments are cloned
// and attached to each data point on the same line.

// The YAML representation for definition files is essentially the same as the
// logical structure, so this can be pretty simple.

// File comments are present in def files. These are comments
// that occur on their own line. There is no formal attachment
// and they can occur anywhere in the file. But due to the line-by-line
// format of the file we can devise three cases and handle them all:
//
// 1. Top of file / between items
// 2. Between data lines in the same item
// 3. End of file

// Parsing:
// We will parse with a simple state machine:
//
// 1. START -> TOP_LEVEL
// 2. TOP_LEVEL -> ITEM
// 3. ITEM -> TOP_LEVEL
// 4. TOP_LEVEL -> END
//
// We can use a similar trick as we did with the antlr parser to determine
// which lines are inter-item lines and which are intra-item, then fetch comments
// and finally assemble a YAML document.

// class Definition {
//     before_comment = null
//     after_comment = null
//     units = {}

//     toYAMLNode(doc) {
//         const node = doc.createNode(this);

//         if (this.before_comment ?? false) {
//             node.commentBefore = this.before_comment;
//         }

//         if (this.after_comment ?? false) {
//             node.comment = this.after_comment;
//         }

//         return node;
//     }

//     toJSON() {
//         return this.units;
//     }
// }

class ItemUnit {
    before_comment = null
    after_comment = null
    items = []

    toYAMLNode(doc) {
        const node = doc.createNode(this);

        if (this.before_comment ?? false) {
            node.commentBefore = this.before_comment;
        }

        if (this.after_comment ?? false) {
            node.comment = this.after_comment;
        }

        return node;
    }

    toJSON() {
        return this.items;
    }
}

class Address {
    before_comment = null
    name = null
    address = null
    comment = null

    toYAMLNode(doc) {
        const node = doc.createNode(this);

        if (this.before_comment ?? false) {
            node.commentBefore = this.before_comment;
        }

        return node;
    }

    toJSON() {
        const { name, comment_data, address } = this;
        const result = name ? { name } : { address };

        if (comment_data) {
            result.comment = comment_data;
        }

        return result;
    }
}

class ServiceItem {
    before_comment = null
    name = null
    port = null
    protocol = null
    comment = null

    toYAMLNode(doc) {
        const node = doc.createNode(this);

        if (this.before_comment ?? false) {
            node.commentBefore = this.before_comment;
        }

        return node;
    }

    toJSON() {
        const { name, comment_data, port, protocol } = this;
        const result = name ? { name } : { port, protocol };

        if (comment_data) {
            result.comment = comment_data;
        }

        return result;
    }
}

function parseLine(line) {
    // A line can have the following parts, any or all of which can be absent:
    // name part
    // values part
    // comment part
    let comment_part;
    [line, comment_part] = line.trim().split('#', 2);
    let name_part;
    [name_part, line] = line.trim().split('=', 2);
    if (!line) {
        line = name_part;
        name_part = undefined;
    } else {
        name_part = name_part.trim();
    }
    line = line.trim()
    let values = line ? line.split(/[ \t\r\n]/) : false;
    return [name_part, values, comment_part];
}

function parseValue(value, type) {
    if (type === DefinitionFileType.NET) {
        return parseValueNet(value);
    } else {
        return parseValueService(value);
    }
}

function isToken(value) {
    //                if value_piece[0].isalpha() and ':' not in value_piece:
    return /^[a-zA-Z][^:]*$/.test(value);
}

function parseValueNet(value) {
    const item = new Address();
    if (isToken(value)) {
        item.name = value;
    } else {
        item.address = value;
    }
    return item;
}

function parseValueService(value) {
    const item = new ServiceItem();
    if (isToken(value)) {
        item.name = value;
    } else {
        [item.port, item.protocol] = value.split('/', 2);
        item.port = Number(item.port);
    }
    return item;
}

function DefinitionFile_parse(text, type) {
    const lines = text?.split('\n').
        map(parseLine);

    const definitions = new Map();
    const unused_comments = [];
    let last_unit = null;

    for (let [name_part, values, comment_part] of lines) {
        if (name_part) {
            last_unit = new ItemUnit();
            if (unused_comments.length) {
                last_unit.before_comment = unused_comments.join('\n');
                unused_comments.splice(0, unused_comments.length);
            }
            definitions.set(name_part, last_unit);

        } else if (values && last_unit === null) {
            throw new TypeError('Unexpected values');
        }

        if (values) {
            values = values.map(value => parseValue(value, type));
            if (comment_part) {
                values.forEach(value => value.comment_data = comment_part);
            }
            if (unused_comments.length) {
                values[0].before_comment = unused_comments.join('\n');
                unused_comments.splice(0, unused_comments.length);
            }
            last_unit.items.push(...values);
        } else if (comment_part) {
            unused_comments.push(comment_part);
        }
    }

    if (unused_comments.length) {
        if (!last_unit) {
            console.warn('WARNING: ignoring empty file');
        }
        last_unit.after_comment = unused_comments.join('\n');
    }

    return definitions;
}


export class DefinitionFileType {
    static NET = new DefinitionFileType('NET')
    static SVC = new DefinitionFileType('SVC')
}


export default class DefinitionFile {
    type = null
    contents = null

    constructor(text, type) {
        this.type = type;
        this.contents = DefinitionFile_parse(text, type);
    }

    toYAML() {
        const doc = new Document();
        const key = this.type === DefinitionFileType.NET ? 'networks' : 'services';
        this.contents?.forEach((value, key, map) => {
            map.set(key, value.toYAMLNode(doc));
        });
        doc.set(key, this.contents);
        return String(doc);
    }
}