import { CharStream, CommonTokenStream }  from 'antlr4';
import MyGrammarLexer from './antlr/JSONLexer.js';
import MyGrammarParser from './antlr/JSONParser.js';

const input = "{ \"test\": [1, 2, 3]}";
const chars = new CharStream(input); // replace this with a FileStream as required
const lexer = new MyGrammarLexer(chars);
const tokens = new CommonTokenStream(lexer);
const parser = new MyGrammarParser(tokens);
const tree = parser.json();

debugger;