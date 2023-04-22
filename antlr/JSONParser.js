// Generated from antlr/JSON.g4 by ANTLR 4.12.0
// jshint ignore: start
import antlr4 from 'antlr4';
import JSONListener from './JSONListener.js';
const serializedATN = [4,1,12,57,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,
1,0,1,0,1,0,1,1,1,1,1,1,1,1,5,1,18,8,1,10,1,12,1,21,9,1,1,1,1,1,1,1,1,1,
3,1,27,8,1,1,2,1,2,1,2,1,2,1,3,1,3,1,3,1,3,5,3,37,8,3,10,3,12,3,40,9,3,1,
3,1,3,1,3,1,3,3,3,46,8,3,1,4,1,4,1,4,1,4,1,4,1,4,1,4,3,4,55,8,4,1,4,0,0,
5,0,2,4,6,8,0,0,61,0,10,1,0,0,0,2,26,1,0,0,0,4,28,1,0,0,0,6,45,1,0,0,0,8,
54,1,0,0,0,10,11,3,8,4,0,11,12,5,0,0,1,12,1,1,0,0,0,13,14,5,1,0,0,14,19,
3,4,2,0,15,16,5,2,0,0,16,18,3,4,2,0,17,15,1,0,0,0,18,21,1,0,0,0,19,17,1,
0,0,0,19,20,1,0,0,0,20,22,1,0,0,0,21,19,1,0,0,0,22,23,5,3,0,0,23,27,1,0,
0,0,24,25,5,1,0,0,25,27,5,3,0,0,26,13,1,0,0,0,26,24,1,0,0,0,27,3,1,0,0,0,
28,29,5,10,0,0,29,30,5,4,0,0,30,31,3,8,4,0,31,5,1,0,0,0,32,33,5,5,0,0,33,
38,3,8,4,0,34,35,5,2,0,0,35,37,3,8,4,0,36,34,1,0,0,0,37,40,1,0,0,0,38,36,
1,0,0,0,38,39,1,0,0,0,39,41,1,0,0,0,40,38,1,0,0,0,41,42,5,6,0,0,42,46,1,
0,0,0,43,44,5,5,0,0,44,46,5,6,0,0,45,32,1,0,0,0,45,43,1,0,0,0,46,7,1,0,0,
0,47,55,5,10,0,0,48,55,5,11,0,0,49,55,3,2,1,0,50,55,3,6,3,0,51,55,5,7,0,
0,52,55,5,8,0,0,53,55,5,9,0,0,54,47,1,0,0,0,54,48,1,0,0,0,54,49,1,0,0,0,
54,50,1,0,0,0,54,51,1,0,0,0,54,52,1,0,0,0,54,53,1,0,0,0,55,9,1,0,0,0,5,19,
26,38,45,54];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class JSONParser extends antlr4.Parser {

    static grammarFileName = "JSON.g4";
    static literalNames = [ null, "'{'", "','", "'}'", "':'", "'['", "']'", 
                            "'true'", "'false'", "'null'" ];
    static symbolicNames = [ null, null, null, null, null, null, null, null, 
                             null, null, "STRING", "NUMBER", "WS" ];
    static ruleNames = [ "json", "obj", "pair", "arr", "value" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = JSONParser.ruleNames;
        this.literalNames = JSONParser.literalNames;
        this.symbolicNames = JSONParser.symbolicNames;
    }



	json() {
	    let localctx = new JsonContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, JSONParser.RULE_json);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 10;
	        this.value();
	        this.state = 11;
	        this.match(JSONParser.EOF);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	obj() {
	    let localctx = new ObjContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, JSONParser.RULE_obj);
	    var _la = 0;
	    try {
	        this.state = 26;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 13;
	            this.match(JSONParser.T__0);
	            this.state = 14;
	            this.pair();
	            this.state = 19;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===2) {
	                this.state = 15;
	                this.match(JSONParser.T__1);
	                this.state = 16;
	                this.pair();
	                this.state = 21;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 22;
	            this.match(JSONParser.T__2);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 24;
	            this.match(JSONParser.T__0);
	            this.state = 25;
	            this.match(JSONParser.T__2);
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	pair() {
	    let localctx = new PairContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, JSONParser.RULE_pair);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 28;
	        this.match(JSONParser.STRING);
	        this.state = 29;
	        this.match(JSONParser.T__3);
	        this.state = 30;
	        this.value();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	arr() {
	    let localctx = new ArrContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, JSONParser.RULE_arr);
	    var _la = 0;
	    try {
	        this.state = 45;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,3,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 32;
	            this.match(JSONParser.T__4);
	            this.state = 33;
	            this.value();
	            this.state = 38;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===2) {
	                this.state = 34;
	                this.match(JSONParser.T__1);
	                this.state = 35;
	                this.value();
	                this.state = 40;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 41;
	            this.match(JSONParser.T__5);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 43;
	            this.match(JSONParser.T__4);
	            this.state = 44;
	            this.match(JSONParser.T__5);
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	value() {
	    let localctx = new ValueContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, JSONParser.RULE_value);
	    try {
	        this.state = 54;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 10:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 47;
	            this.match(JSONParser.STRING);
	            break;
	        case 11:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 48;
	            this.match(JSONParser.NUMBER);
	            break;
	        case 1:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 49;
	            this.obj();
	            break;
	        case 5:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 50;
	            this.arr();
	            break;
	        case 7:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 51;
	            this.match(JSONParser.T__6);
	            break;
	        case 8:
	            this.enterOuterAlt(localctx, 6);
	            this.state = 52;
	            this.match(JSONParser.T__7);
	            break;
	        case 9:
	            this.enterOuterAlt(localctx, 7);
	            this.state = 53;
	            this.match(JSONParser.T__8);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

JSONParser.EOF = antlr4.Token.EOF;
JSONParser.T__0 = 1;
JSONParser.T__1 = 2;
JSONParser.T__2 = 3;
JSONParser.T__3 = 4;
JSONParser.T__4 = 5;
JSONParser.T__5 = 6;
JSONParser.T__6 = 7;
JSONParser.T__7 = 8;
JSONParser.T__8 = 9;
JSONParser.STRING = 10;
JSONParser.NUMBER = 11;
JSONParser.WS = 12;

JSONParser.RULE_json = 0;
JSONParser.RULE_obj = 1;
JSONParser.RULE_pair = 2;
JSONParser.RULE_arr = 3;
JSONParser.RULE_value = 4;

class JsonContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONParser.RULE_json;
    }

	value() {
	    return this.getTypedRuleContext(ValueContext,0);
	};

	EOF() {
	    return this.getToken(JSONParser.EOF, 0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONListener ) {
	        listener.enterJson(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONListener ) {
	        listener.exitJson(this);
		}
	}


}



class ObjContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONParser.RULE_obj;
    }

	pair = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(PairContext);
	    } else {
	        return this.getTypedRuleContext(PairContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof JSONListener ) {
	        listener.enterObj(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONListener ) {
	        listener.exitObj(this);
		}
	}


}



class PairContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONParser.RULE_pair;
    }

	STRING() {
	    return this.getToken(JSONParser.STRING, 0);
	};

	value() {
	    return this.getTypedRuleContext(ValueContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONListener ) {
	        listener.enterPair(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONListener ) {
	        listener.exitPair(this);
		}
	}


}



class ArrContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONParser.RULE_arr;
    }

	value = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ValueContext);
	    } else {
	        return this.getTypedRuleContext(ValueContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof JSONListener ) {
	        listener.enterArr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONListener ) {
	        listener.exitArr(this);
		}
	}


}



class ValueContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONParser.RULE_value;
    }

	STRING() {
	    return this.getToken(JSONParser.STRING, 0);
	};

	NUMBER() {
	    return this.getToken(JSONParser.NUMBER, 0);
	};

	obj() {
	    return this.getTypedRuleContext(ObjContext,0);
	};

	arr() {
	    return this.getTypedRuleContext(ArrContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONListener ) {
	        listener.enterValue(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONListener ) {
	        listener.exitValue(this);
		}
	}


}




JSONParser.JsonContext = JsonContext; 
JSONParser.ObjContext = ObjContext; 
JSONParser.PairContext = PairContext; 
JSONParser.ArrContext = ArrContext; 
JSONParser.ValueContext = ValueContext; 
