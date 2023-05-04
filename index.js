import { CharStream, CommonTokenStream, Parser } from 'antlr4';
import MyGrammarLexer from './antlr/JSONLexer.js';
import MyGrammarParser from './antlr/JSONParser.js';
import JSONListener from './antlr/JSONListener.js'
import JSONVisitor from './antlr/JSONVisitor.js';

function visitorParse(input) {
    const chars = new CharStream(input); // replace this with a FileStream as required
    const lexer = new MyGrammarLexer(chars);
    const tokens = new CommonTokenStream(lexer);
    const parser = new MyGrammarParser(tokens);
    const tree = parser.json();
    const text = tokens.getText(tree);
    const text2 = chars.getText(tree.start.start, tree.stop.stop);

    class ArrayWithContains extends Array {
    }
    ArrayWithContains.prototype.contains = Array.prototype.includes;

    class MyVisitor extends JSONVisitor {
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

function simpleParse(input) {
    const chars = new CharStream(input); // replace this with a FileStream as required
    const lexer = new MyGrammarLexer(chars);
    const tokens = new CommonTokenStream(lexer);
    const parser = new MyGrammarParser(tokens);
    const tree = parser.json();
    const text = tokens.getText(tree);
    const text2 = chars.getText(tree.start.start, tree.stop.stop);
    const cpt = Parser;
    debugger;
}


function listenerParse(input) {
    const chars = new CharStream(input); // replace this with a FileStream as required
    const lexer = new MyGrammarLexer(chars);
    const tokens = new CommonTokenStream(lexer);
    const parser = new MyGrammarParser(tokens);

    class MyParseListener extends JSONListener {
        enterObj(ctx) {
            return "PLACEHOLDER"
        }
        exitObj(ctx) {
            console.log(chars);
            console.log(tokens);
            debugger;
            return "PLACEHOLDER2"

        }
    }

    const parse_listener = new MyParseListener();
    parser.addParseListener(parse_listener)
    const tree = parser.json();
    const text = tokens.getText(tree);
    const text2 = chars.getText(tree.start.start, tree.stop.stop);
    debugger;
}

const json1 = "{ \"test\": [1, 2, 3]}";
const json_comments = `
[
{
    // Comment ABC
    "test": [100, 200   ],
    "test2": 40
},
{
    // DEF Comment
    "test3": 99
},
{
    "data": [1,2,3]
}
]`;

// simpleParse(json_comments);
// listenerParse(json_comments);
visitorParse(json_comments)
