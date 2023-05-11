"use strict"

import { CharStream, CommonTokenStream } from 'antlr4';
import PolicyLexer from '../antlr/PolicyLexer.js';
import PolicyParser from '../antlr/PolicyParser.js';
import { Document, visit } from 'yaml';

import PolicyParseTreeVisitor from './visitor.js';
import { IncludeTerm } from './visitor.js';

// locate input files (glob **/*.pol)
// for each input file
// > pol2yaml
//   preprocess
//   - enclose inc files in a dummy filter
//   - replace include directives with a dummy term
//   parse / visitor
//   - validate more complex regexes (DSCP)
//   - validate int(), flex-match logic, strip verbatim esc sequences, validate 'expires' as a date
//   - warn and discard duplicate values (upwards for 'target', downwards for the rest)
//   - produce a logical rule list
//   - check for interior comments and collect the charstream if present
//   produce YAML


// Private methods
function PolicyFile_preprocess_includes(text) {
    let count = 100;

    // mimics python: file.splitlines() -> line.split() -> words[0] == "#include", words[1].strip('\'"')
    text = text.replaceAll(
        /^[\r\n\t\f\v ]*#include[\r\n\t\f\v ]+["']*(.*?)["']*(?:[\r\n\t\f\v ]+|$)/gm,
        (_, include_file) => `
term PLACEHOLDER-INCLUDE-${++count} {
    comment:: "${include_file}"
}

`);

    return text;
}

function PolicyFile_replace_includes(policy_file) {

    const replace_includes = term_list => {
        for (const i in term_list) {
            const term = term_list[i];
            if (term.name?.startsWith("PLACEHOLDER-INCLUDE-")) {
                const new_term = new IncludeTerm();
                new_term.before_comment = term.before_comment;
                new_term.rules.include = term.rules.comment;
                term_list[i] = new_term;
            }
        }
    }

    if (policy_file.is_include) {
        replace_includes(policy_file.contents);
    } else {
        for (const filter of policy_file.contents) {
            replace_includes(filter.terms);
        }
    }
}

function PolicyFile_parse(policy_file, text) {
    const lexer = new PolicyLexer(new CharStream(text));
    const parser = new PolicyParser(new CommonTokenStream(lexer));

    const tree = policy_file.is_include ? parser.term_list_only() : parser.policy();

    const visitor = new PolicyParseTreeVisitor();
    return visitor.visit(tree);
}

export default class PolicyFile {
    filename = null
    is_include = false
    contents = null

    constructor(filename, text, is_include = false) {
        this.filename = filename;
        this.is_include = is_include;

        text = PolicyFile_preprocess_includes(text);
        this.contents = PolicyFile_parse(this, text);
        PolicyFile_replace_includes(this);
    }

    toYAML() {
        const doc = new Document();

        if (this.is_include) {
            
            const term_nodes = this.contents?.map(term => term.toYAMLNode(doc)) ?? null;
            doc.set('terms', term_nodes);
        } else {

            const filter_nodes = this.contents?.map(filter => filter.toYAMLNode(doc)) ?? null;
            doc.set('filters', filter_nodes);
        }

        visit(doc, {
            // touch up presentation: apply block_literal formatting to comments
            Pair(_, value) {
                if (value.key == "comment") {
                    value.value.type = 'BLOCK_LITERAL';
                }
            }
        });

        return String(doc);
    }
}