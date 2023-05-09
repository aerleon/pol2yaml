"use strict"

import * as fs from 'node:fs';
import { CharStream, CommonTokenStream, Parser } from 'antlr4';
import PolicyLexer from './antlr/PolicyLexer.js';
import PolicyParser from './antlr/PolicyParser.js';
import { stringify } from 'yaml';

import PolicyParseTreeVisitor from './visitor.js';

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

// Antlr4 Util
class ArrayWithContains extends Array {
}
ArrayWithContains.prototype.contains = Array.prototype.includes;

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
                term_list[i] = { "include": term.rules.comment };
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
    const chars = new CharStream(text); // replace this with a FileStream as required
    const lexer = new PolicyLexer(chars);
    const tokens = new CommonTokenStream(lexer);
    const parser = new PolicyParser(tokens);
    // TODO if policyfile_obj.is_include, try to parse using parser.rule_list();
    // We can someday fall back to parser.header(), parser.term(), parser.filter(), but
    // support is needed on the Aerleon side.
    const tree = policy_file.is_include ? parser.term_list() : parser.policy();
    // console.log(tokens.tokens.map(tk => `${PolicyParser.symbolicNames[tk.type]}, ${chars.getText(tk.start, tk.stop)}`));
    const visitor = new PolicyParseTreeVisitor();
    return visitor.visit(tree);
}

// policyfile.js (Again)
class PolicyFile {
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
        return stringify(this.contents);
    }
}



// main
const DEFAULT_INPUT_FILENAME = 'policies/includes/untrusted-networks-blocking.inc';
// const DEFAULT_INPUT_FILENAME = 'policies/pol/sample_msmpc.pol'; 
// const DEFAULT_INPUT_FILENAME = './policies/pol/sample_k8s.pol';
function demo(argv) {
    // glob
    // const glob = [];
    // for (const filename of glob) {
    const filename = argv[2] ?? DEFAULT_INPUT_FILENAME;
    const text = fs.readFileSync(filename)?.toString();
    const pf = new PolicyFile(filename, text, true);
    console.log(pf.toYAML());
    // }
}

// old POC reference code (delete)
function visitorParse(input) {
    const chars = new CharStream(input); // replace this with a FileStream as required
    const lexer = new PolicyLexer(chars);
    const tokens = new CommonTokenStream(lexer);
    const parser = new PolicyParser(tokens);
    const tree = parser.json();
    const text = tokens.getText(tree);
    const text2 = chars.getText(tree.start.start, tree.stop.stop);

    class ArrayWithContains extends Array {
    }
    ArrayWithContains.prototype.contains = Array.prototype.includes;

    class MyVisitor extends PolicyVisitor {
        visitValue(ctx) {
            return this.visitChildren(ctx)[0];
        }

        visitTerminal(ctx) {
            return ctx.getText()
        }

        // Visit a parse tree produced by JSONParser#json.
        visitJson(ctx) {
            return this.visitChildren(ctx)[0];
        }

        // Visit a parse tree produced by JSONParser#obj.
        visitObj(ctx) {
            const result = {};

            // const tgt = tokens.getText(ctx);
            // const token_range = tokens.tokens.slice(ctx.start.tokenIndex, ctx.stop.tokenIndex);
            // for (const token of token_range) {
            //     console.log(token);
            // }
            const awc = new ArrayWithContains();
            awc.push(MyGrammarParser.LINE_COMMENT);
            const comment_tokens = tokens.getTokens(ctx.start.tokenIndex, ctx.stop.tokenIndex, awc);
            result.has_comments = !!comment_tokens.length;
            result.original_text = chars.getText(ctx.start.start, ctx.stop.stop)

            const childs = this.visitChildren(ctx).slice(1, -1);
            for (const child of childs) {
                if (child == ',') {
                    continue
                }
                result[child[0]] = child[1];
            }
            return result
        }


        // Visit a parse tree produced by JSONParser#pair.
        visitPair(ctx) {
            const childs = this.visitChildren(ctx);
            return [childs[0], childs[2]];
        }


        // Visit a parse tree produced by JSONParser#arr.
        visitArr(ctx) {
            const childs = this.visitChildren(ctx).slice(1, -1);
            const result = [];
            for (const child of childs) {
                if (child == ',') {
                    continue
                }
                result.push(child);
            }
            return result
        }
    }

    const visitor = new MyVisitor();

    const output = visitor.visit(tree);
    debugger;
}

demo(process.argv);