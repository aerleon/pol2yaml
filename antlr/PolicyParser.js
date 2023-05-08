// Generated from antlr/Policy.g4 by ANTLR 4.12.0
// jshint ignore: start
import antlr4 from 'antlr4';
import PolicyVisitor from './PolicyVisitor.js';

const serializedATN = [4,1,90,175,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,
4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,
2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,
20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,1,0,5,0,50,8,0,10,0,12,0,53,9,0,1,
0,1,0,1,1,1,1,1,1,1,2,4,2,61,8,2,11,2,12,2,62,1,3,1,3,1,3,1,3,1,3,1,4,1,
4,1,4,1,4,1,4,1,4,1,5,5,5,77,8,5,10,5,12,5,80,9,5,1,6,1,6,1,6,1,6,1,6,1,
6,3,6,88,8,6,1,7,1,7,1,7,1,7,1,7,1,8,1,8,1,9,1,9,1,9,1,9,5,9,101,8,9,10,
9,12,9,104,9,9,1,10,1,10,1,11,1,11,1,11,1,11,1,11,1,12,1,12,1,13,1,13,1,
13,1,13,1,13,1,14,1,14,1,15,1,15,1,15,1,15,1,15,1,15,1,16,1,16,1,17,1,17,
1,17,1,17,1,17,3,17,135,8,17,1,18,1,18,1,19,1,19,1,19,1,19,1,19,1,19,1,19,
3,19,146,8,19,1,19,1,19,1,19,1,19,1,19,5,19,153,8,19,10,19,12,19,156,9,19,
1,20,1,20,1,20,1,20,1,20,1,20,1,21,5,21,165,8,21,10,21,12,21,168,9,21,1,
22,1,22,1,22,1,23,1,23,1,23,0,1,38,24,0,2,4,6,8,10,12,14,16,18,20,22,24,
26,28,30,32,34,36,38,40,42,44,46,0,5,18,0,6,6,9,11,14,14,22,23,25,26,30,
30,32,32,37,38,40,41,43,44,47,47,49,49,51,51,54,54,56,56,59,59,68,69,71,
71,16,0,7,8,12,13,15,21,24,24,28,29,33,36,42,42,45,46,48,48,50,50,52,53,
55,55,57,58,60,65,67,67,70,70,1,0,75,76,1,0,81,83,3,0,74,74,76,80,82,83,
165,0,51,1,0,0,0,2,56,1,0,0,0,4,60,1,0,0,0,6,64,1,0,0,0,8,69,1,0,0,0,10,
78,1,0,0,0,12,87,1,0,0,0,14,89,1,0,0,0,16,94,1,0,0,0,18,96,1,0,0,0,20,105,
1,0,0,0,22,107,1,0,0,0,24,112,1,0,0,0,26,114,1,0,0,0,28,119,1,0,0,0,30,121,
1,0,0,0,32,127,1,0,0,0,34,129,1,0,0,0,36,136,1,0,0,0,38,145,1,0,0,0,40,157,
1,0,0,0,42,166,1,0,0,0,44,169,1,0,0,0,46,172,1,0,0,0,48,50,3,2,1,0,49,48,
1,0,0,0,50,53,1,0,0,0,51,49,1,0,0,0,51,52,1,0,0,0,52,54,1,0,0,0,53,51,1,
0,0,0,54,55,5,0,0,1,55,1,1,0,0,0,56,57,3,6,3,0,57,58,3,4,2,0,58,3,1,0,0,
0,59,61,3,8,4,0,60,59,1,0,0,0,61,62,1,0,0,0,62,60,1,0,0,0,62,63,1,0,0,0,
63,5,1,0,0,0,64,65,5,4,0,0,65,66,5,85,0,0,66,67,3,10,5,0,67,68,5,86,0,0,
68,7,1,0,0,0,69,70,5,5,0,0,70,71,5,83,0,0,71,72,5,85,0,0,72,73,3,10,5,0,
73,74,5,86,0,0,74,9,1,0,0,0,75,77,3,12,6,0,76,75,1,0,0,0,77,80,1,0,0,0,78,
76,1,0,0,0,78,79,1,0,0,0,79,11,1,0,0,0,80,78,1,0,0,0,81,88,3,14,7,0,82,88,
3,18,9,0,83,88,3,22,11,0,84,88,3,26,13,0,85,88,3,30,15,0,86,88,3,34,17,0,
87,81,1,0,0,0,87,82,1,0,0,0,87,83,1,0,0,0,87,84,1,0,0,0,87,85,1,0,0,0,87,
86,1,0,0,0,88,13,1,0,0,0,89,90,3,16,8,0,90,91,5,84,0,0,91,92,5,84,0,0,92,
93,3,46,23,0,93,15,1,0,0,0,94,95,7,0,0,0,95,17,1,0,0,0,96,97,3,20,10,0,97,
98,5,84,0,0,98,102,5,84,0,0,99,101,3,46,23,0,100,99,1,0,0,0,101,104,1,0,
0,0,102,100,1,0,0,0,102,103,1,0,0,0,103,19,1,0,0,0,104,102,1,0,0,0,105,106,
7,1,0,0,106,21,1,0,0,0,107,108,3,24,12,0,108,109,5,84,0,0,109,110,5,84,0,
0,110,111,3,38,19,0,111,23,1,0,0,0,112,113,5,66,0,0,113,25,1,0,0,0,114,115,
3,28,14,0,115,116,5,84,0,0,116,117,5,84,0,0,117,118,3,42,21,0,118,27,1,0,
0,0,119,120,5,27,0,0,120,29,1,0,0,0,121,122,3,32,16,0,122,123,5,84,0,0,123,
124,5,84,0,0,124,125,5,83,0,0,125,126,7,2,0,0,126,31,1,0,0,0,127,128,5,72,
0,0,128,33,1,0,0,0,129,130,3,36,18,0,130,131,5,84,0,0,131,132,5,84,0,0,132,
134,5,83,0,0,133,135,5,83,0,0,134,133,1,0,0,0,134,135,1,0,0,0,135,35,1,0,
0,0,136,137,5,73,0,0,137,37,1,0,0,0,138,139,6,19,-1,0,139,140,5,87,0,0,140,
141,3,38,19,0,141,142,5,88,0,0,142,146,1,0,0,0,143,146,3,40,20,0,144,146,
1,0,0,0,145,138,1,0,0,0,145,143,1,0,0,0,145,144,1,0,0,0,146,154,1,0,0,0,
147,148,10,4,0,0,148,149,5,1,0,0,149,153,3,40,20,0,150,151,10,3,0,0,151,
153,3,40,20,0,152,147,1,0,0,0,152,150,1,0,0,0,153,156,1,0,0,0,154,152,1,
0,0,0,154,155,1,0,0,0,155,39,1,0,0,0,156,154,1,0,0,0,157,158,5,2,0,0,158,
159,5,83,0,0,159,160,5,1,0,0,160,161,5,83,0,0,161,162,5,3,0,0,162,41,1,0,
0,0,163,165,3,44,22,0,164,163,1,0,0,0,165,168,1,0,0,0,166,164,1,0,0,0,166,
167,1,0,0,0,167,43,1,0,0,0,168,166,1,0,0,0,169,170,5,83,0,0,170,171,7,3,
0,0,171,45,1,0,0,0,172,173,7,4,0,0,173,47,1,0,0,0,10,51,62,78,87,102,134,
145,152,154,166];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class PolicyParser extends antlr4.Parser {

    static grammarFileName = "Policy.g4";
    static literalNames = [ null, "','", "'('", "')'", "'header'", "'term'", 
                            "'action'", "'address'", "'address-exclude'", 
                            "'restrict-address-family'", "'comment'", "'counter'", 
                            "'destination-address'", "'destination-exclude'", 
                            "'destination-interface'", "'destination-prefix'", 
                            "'destination-prefix-except'", "'destination-port'", 
                            "'destination-tag'", "'destination-zone'", "'dscp-except'", 
                            "'dscp-match'", "'dscp-set'", "'encapsulate'", 
                            "'ether-type'", "'expiration'", "'filter-term'", 
                            "'flexible-match-range'", "'forwarding-class'", 
                            "'forwarding-class-except'", "'fragment-offset'", 
                            "'hex'", "'hop-limit'", "'apply-groups'", "'apply-groups-except'", 
                            "'icmp-type'", "'icmp-code'", "'logging'", "'log-limit'", 
                            "'log_name'", "'loss-priority'", "'next-ip'", 
                            "'option'", "'owner'", "'packet-length'", "'platform'", 
                            "'platform-exclude'", "'policer'", "'port'", 
                            "'port-mirror'", "'precedence'", "'priority'", 
                            "'protocol'", "'protocol-except'", "'qos'", 
                            "'pan-application'", "'routing-instance'", "'source-address'", 
                            "'source-exclude'", "'source-interface'", "'source-prefix'", 
                            "'source-prefix-except'", "'source-port'", "'source-tag'", 
                            "'source-zone'", "'target'", "'target-resources'", 
                            "'target-service-accounts'", "'timeout'", "'traffic-class-count'", 
                            "'traffic-type'", "'ttl'", "'verbatim'", "'vpn'", 
                            null, null, null, null, null, null, null, null, 
                            null, null, "':'", "'{'", "'}'", "'['", "']'" ];
    static symbolicNames = [ null, null, null, null, "KW_HEADER", "KW_TERM", 
                             "LABEL_ACTION", "LABEL_ADDR", "LABEL_ADDREXCLUDE", 
                             "LABEL_RESTRICT_ADDRESS_FAMILY", "LABEL_COMMENT", 
                             "LABEL_COUNTER", "LABEL_DADDR", "LABEL_DADDREXCLUDE", 
                             "LABEL_DINTERFACE", "LABEL_DPFX", "LABEL_EDPFX", 
                             "LABEL_DPORT", "LABEL_DTAG", "LABEL_DZONE", 
                             "LABEL_DSCP_EXCEPT", "LABEL_DSCP_MATCH", "LABEL_DSCP_SET", 
                             "LABEL_ENCAPSULATE", "LABEL_ETHER_TYPE", "LABEL_EXPIRATION", 
                             "LABEL_FILTER_TERM", "LABEL_FLEXIBLE_MATCH_RANGE", 
                             "LABEL_FORWARDING_CLASS", "LABEL_FORWARDING_CLASS_EXCEPT", 
                             "LABEL_FRAGMENT_OFFSET", "LABEL_HEX", "LABEL_HOP_LIMIT", 
                             "LABEL_APPLY_GROUPS", "LABEL_APPLY_GROUPS_EXCEPT", 
                             "LABEL_ICMP_TYPE", "LABEL_ICMP_CODE", "LABEL_LOGGING", 
                             "LABEL_LOG_LIMIT", "LABEL_LOG_NAME", "LABEL_LOSS_PRIORITY", 
                             "LABEL_NEXT_IP", "LABEL_OPTION", "LABEL_OWNER", 
                             "LABEL_PACKET_LEN", "LABEL_PLATFORM", "LABEL_PLATFORMEXCLUDE", 
                             "LABEL_POLICER", "LABEL_PORT", "LABEL_PORT_MIRROR", 
                             "LABEL_PRECEDENCE", "LABEL_PRIORITY", "LABEL_PROTOCOL", 
                             "LABEL_PROTOCOL_EXCEPT", "LABEL_QOS", "LABEL_PAN_APPLICATION", 
                             "LABEL_ROUTING_INSTANCE", "LABEL_SADDR", "LABEL_SADDREXCLUDE", 
                             "LABEL_SINTERFACE", "LABEL_SPFX", "LABEL_ESPFX", 
                             "LABEL_SPORT", "LABEL_STAG", "LABEL_SZONE", 
                             "LABEL_TARGET", "LABEL_TARGET_RESOURCES", "LABEL_TARGET_SERVICE_ACCOUNTS", 
                             "LABEL_TIMEOUT", "LABEL_TRAFFIC_CLASS_COUNT", 
                             "LABEL_TRAFFIC_TYPE", "LABEL_TTL", "LABEL_VERBATIM", 
                             "LABEL_VPN", "LOG_LIMIT", "ESCAPED_STRING", 
                             "DOUBLE_QUOTED_STRING", "DSCP_RANGE", "DATE_YMD", 
                             "INTEGER_RANGE", "DSCP", "HEX", "INTEGER", 
                             "STRING", "SYM_COLON", "SYM_LBRACE", "SYM_RBRACE", 
                             "SYM_LBRACKET", "SYM_RBRACKET", "LINE_COMMENT", 
                             "WS" ];
    static ruleNames = [ "policy", "filter", "term_list", "header", "term", 
                         "rule_list", "policy_rule", "value_rule", "value_lhs", 
                         "value_list_rule", "value_list_lhs", "tuple_list_rule", 
                         "tuple_list_lhs", "flexible_match_rule", "flexible_match_lhs", 
                         "verbatim_rule", "verbatim_lhs", "vpn_rule", "vpn_lhs", 
                         "zero_or_more_tuples", "tuple", "flex_match_key_values", 
                         "flex_match_pair", "value" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = PolicyParser.ruleNames;
        this.literalNames = PolicyParser.literalNames;
        this.symbolicNames = PolicyParser.symbolicNames;
    }

    sempred(localctx, ruleIndex, predIndex) {
    	switch(ruleIndex) {
    	case 19:
    	    		return this.zero_or_more_tuples_sempred(localctx, predIndex);
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    zero_or_more_tuples_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 0:
    			return this.precpred(this._ctx, 4);
    		case 1:
    			return this.precpred(this._ctx, 3);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };




	policy() {
	    let localctx = new PolicyContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, PolicyParser.RULE_policy);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 51;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===4) {
	            this.state = 48;
	            this.filter();
	            this.state = 53;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 54;
	        this.match(PolicyParser.EOF);
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



	filter() {
	    let localctx = new FilterContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, PolicyParser.RULE_filter);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 56;
	        this.header();
	        this.state = 57;
	        this.term_list();
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



	term_list() {
	    let localctx = new Term_listContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, PolicyParser.RULE_term_list);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 60; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 59;
	            this.term();
	            this.state = 62; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===5);
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



	header() {
	    let localctx = new HeaderContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, PolicyParser.RULE_header);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 64;
	        this.match(PolicyParser.KW_HEADER);
	        this.state = 65;
	        this.match(PolicyParser.SYM_LBRACE);
	        this.state = 66;
	        this.rule_list();
	        this.state = 67;
	        this.match(PolicyParser.SYM_RBRACE);
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



	term() {
	    let localctx = new TermContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, PolicyParser.RULE_term);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 69;
	        this.match(PolicyParser.KW_TERM);
	        this.state = 70;
	        localctx.term_name = this.match(PolicyParser.STRING);
	        this.state = 71;
	        this.match(PolicyParser.SYM_LBRACE);
	        this.state = 72;
	        this.rule_list();
	        this.state = 73;
	        this.match(PolicyParser.SYM_RBRACE);
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



	rule_list() {
	    let localctx = new Rule_listContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, PolicyParser.RULE_rule_list);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 78;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) === 0 && ((1 << _la) & 2147483584) !== 0) || ((((_la - 32)) & ~0x1f) === 0 && ((1 << (_la - 32)) & 4294967167) !== 0) || ((((_la - 64)) & ~0x1f) === 0 && ((1 << (_la - 64)) & 1023) !== 0)) {
	            this.state = 75;
	            this.policy_rule();
	            this.state = 80;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
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



	policy_rule() {
	    let localctx = new Policy_ruleContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, PolicyParser.RULE_policy_rule);
	    try {
	        this.state = 87;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 6:
	        case 9:
	        case 10:
	        case 11:
	        case 14:
	        case 22:
	        case 23:
	        case 25:
	        case 26:
	        case 30:
	        case 32:
	        case 37:
	        case 38:
	        case 40:
	        case 41:
	        case 43:
	        case 44:
	        case 47:
	        case 49:
	        case 51:
	        case 54:
	        case 56:
	        case 59:
	        case 68:
	        case 69:
	        case 71:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 81;
	            this.value_rule();
	            break;
	        case 7:
	        case 8:
	        case 12:
	        case 13:
	        case 15:
	        case 16:
	        case 17:
	        case 18:
	        case 19:
	        case 20:
	        case 21:
	        case 24:
	        case 28:
	        case 29:
	        case 33:
	        case 34:
	        case 35:
	        case 36:
	        case 42:
	        case 45:
	        case 46:
	        case 48:
	        case 50:
	        case 52:
	        case 53:
	        case 55:
	        case 57:
	        case 58:
	        case 60:
	        case 61:
	        case 62:
	        case 63:
	        case 64:
	        case 65:
	        case 67:
	        case 70:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 82;
	            this.value_list_rule();
	            break;
	        case 66:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 83;
	            this.tuple_list_rule();
	            break;
	        case 27:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 84;
	            this.flexible_match_rule();
	            break;
	        case 72:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 85;
	            this.verbatim_rule();
	            break;
	        case 73:
	            this.enterOuterAlt(localctx, 6);
	            this.state = 86;
	            this.vpn_rule();
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



	value_rule() {
	    let localctx = new Value_ruleContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, PolicyParser.RULE_value_rule);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 89;
	        this.value_lhs();
	        this.state = 90;
	        this.match(PolicyParser.SYM_COLON);
	        this.state = 91;
	        this.match(PolicyParser.SYM_COLON);
	        this.state = 92;
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



	value_lhs() {
	    let localctx = new Value_lhsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, PolicyParser.RULE_value_lhs);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 94;
	        _la = this._input.LA(1);
	        if(!((((_la) & ~0x1f) === 0 && ((1 << _la) & 1187008064) !== 0) || ((((_la - 32)) & ~0x1f) === 0 && ((1 << (_la - 32)) & 155884385) !== 0) || ((((_la - 68)) & ~0x1f) === 0 && ((1 << (_la - 68)) & 11) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
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



	value_list_rule() {
	    let localctx = new Value_list_ruleContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, PolicyParser.RULE_value_list_rule);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 96;
	        this.value_list_lhs();
	        this.state = 97;
	        this.match(PolicyParser.SYM_COLON);
	        this.state = 98;
	        this.match(PolicyParser.SYM_COLON);
	        this.state = 102;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(((((_la - 74)) & ~0x1f) === 0 && ((1 << (_la - 74)) & 893) !== 0)) {
	            this.state = 99;
	            this.value();
	            this.state = 104;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
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



	value_list_lhs() {
	    let localctx = new Value_list_lhsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 20, PolicyParser.RULE_value_list_lhs);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 105;
	        _la = this._input.LA(1);
	        if(!(((((_la - 7)) & ~0x1f) === 0 && ((1 << (_la - 7)) & 1013088099) !== 0) || ((((_la - 42)) & ~0x1f) === 0 && ((1 << (_la - 42)) & 318614873) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
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



	tuple_list_rule() {
	    let localctx = new Tuple_list_ruleContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 22, PolicyParser.RULE_tuple_list_rule);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 107;
	        this.tuple_list_lhs();
	        this.state = 108;
	        this.match(PolicyParser.SYM_COLON);
	        this.state = 109;
	        this.match(PolicyParser.SYM_COLON);
	        this.state = 110;
	        this.zero_or_more_tuples(0);
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



	tuple_list_lhs() {
	    let localctx = new Tuple_list_lhsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 24, PolicyParser.RULE_tuple_list_lhs);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 112;
	        this.match(PolicyParser.LABEL_TARGET_RESOURCES);
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



	flexible_match_rule() {
	    let localctx = new Flexible_match_ruleContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 26, PolicyParser.RULE_flexible_match_rule);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 114;
	        this.flexible_match_lhs();
	        this.state = 115;
	        this.match(PolicyParser.SYM_COLON);
	        this.state = 116;
	        this.match(PolicyParser.SYM_COLON);
	        this.state = 117;
	        this.flex_match_key_values();
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



	flexible_match_lhs() {
	    let localctx = new Flexible_match_lhsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 28, PolicyParser.RULE_flexible_match_lhs);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 119;
	        this.match(PolicyParser.LABEL_FLEXIBLE_MATCH_RANGE);
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



	verbatim_rule() {
	    let localctx = new Verbatim_ruleContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 30, PolicyParser.RULE_verbatim_rule);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 121;
	        this.verbatim_lhs();
	        this.state = 122;
	        this.match(PolicyParser.SYM_COLON);
	        this.state = 123;
	        this.match(PolicyParser.SYM_COLON);
	        this.state = 124;
	        localctx.platform = this.match(PolicyParser.STRING);
	        this.state = 125;
	        localctx.text = this._input.LT(1);
	        _la = this._input.LA(1);
	        if(!(_la===75 || _la===76)) {
	            localctx.text = this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
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



	verbatim_lhs() {
	    let localctx = new Verbatim_lhsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 32, PolicyParser.RULE_verbatim_lhs);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 127;
	        this.match(PolicyParser.LABEL_VERBATIM);
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



	vpn_rule() {
	    let localctx = new Vpn_ruleContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 34, PolicyParser.RULE_vpn_rule);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 129;
	        this.vpn_lhs();
	        this.state = 130;
	        this.match(PolicyParser.SYM_COLON);
	        this.state = 131;
	        this.match(PolicyParser.SYM_COLON);
	        this.state = 132;
	        localctx.name = this.match(PolicyParser.STRING);
	        this.state = 134;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===83) {
	            this.state = 133;
	            localctx.pair_policy = this.match(PolicyParser.STRING);
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



	vpn_lhs() {
	    let localctx = new Vpn_lhsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 36, PolicyParser.RULE_vpn_lhs);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 136;
	        this.match(PolicyParser.LABEL_VPN);
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


	zero_or_more_tuples(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new Zero_or_more_tuplesContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 38;
	    this.enterRecursionRule(localctx, 38, PolicyParser.RULE_zero_or_more_tuples, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 145;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
	        switch(la_) {
	        case 1:
	            this.state = 139;
	            this.match(PolicyParser.SYM_LBRACKET);
	            this.state = 140;
	            this.zero_or_more_tuples(0);
	            this.state = 141;
	            this.match(PolicyParser.SYM_RBRACKET);
	            break;

	        case 2:
	            this.state = 143;
	            this.tuple();
	            break;

	        case 3:
	            break;

	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 154;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,8,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 152;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new Zero_or_more_tuplesContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, PolicyParser.RULE_zero_or_more_tuples);
	                    this.state = 147;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 148;
	                    this.match(PolicyParser.T__0);
	                    this.state = 149;
	                    this.tuple();
	                    break;

	                case 2:
	                    localctx = new Zero_or_more_tuplesContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, PolicyParser.RULE_zero_or_more_tuples);
	                    this.state = 150;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 151;
	                    this.tuple();
	                    break;

	                } 
	            }
	            this.state = 156;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,8,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}



	tuple() {
	    let localctx = new TupleContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 40, PolicyParser.RULE_tuple);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 157;
	        this.match(PolicyParser.T__1);
	        this.state = 158;
	        this.match(PolicyParser.STRING);
	        this.state = 159;
	        this.match(PolicyParser.T__0);
	        this.state = 160;
	        this.match(PolicyParser.STRING);
	        this.state = 161;
	        this.match(PolicyParser.T__2);
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



	flex_match_key_values() {
	    let localctx = new Flex_match_key_valuesContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 42, PolicyParser.RULE_flex_match_key_values);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 166;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===83) {
	            this.state = 163;
	            this.flex_match_pair();
	            this.state = 168;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
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



	flex_match_pair() {
	    let localctx = new Flex_match_pairContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 44, PolicyParser.RULE_flex_match_pair);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 169;
	        this.match(PolicyParser.STRING);
	        this.state = 170;
	        _la = this._input.LA(1);
	        if(!(((((_la - 81)) & ~0x1f) === 0 && ((1 << (_la - 81)) & 7) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
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
	    this.enterRule(localctx, 46, PolicyParser.RULE_value);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 172;
	        _la = this._input.LA(1);
	        if(!(((((_la - 74)) & ~0x1f) === 0 && ((1 << (_la - 74)) & 893) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
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

PolicyParser.EOF = antlr4.Token.EOF;
PolicyParser.T__0 = 1;
PolicyParser.T__1 = 2;
PolicyParser.T__2 = 3;
PolicyParser.KW_HEADER = 4;
PolicyParser.KW_TERM = 5;
PolicyParser.LABEL_ACTION = 6;
PolicyParser.LABEL_ADDR = 7;
PolicyParser.LABEL_ADDREXCLUDE = 8;
PolicyParser.LABEL_RESTRICT_ADDRESS_FAMILY = 9;
PolicyParser.LABEL_COMMENT = 10;
PolicyParser.LABEL_COUNTER = 11;
PolicyParser.LABEL_DADDR = 12;
PolicyParser.LABEL_DADDREXCLUDE = 13;
PolicyParser.LABEL_DINTERFACE = 14;
PolicyParser.LABEL_DPFX = 15;
PolicyParser.LABEL_EDPFX = 16;
PolicyParser.LABEL_DPORT = 17;
PolicyParser.LABEL_DTAG = 18;
PolicyParser.LABEL_DZONE = 19;
PolicyParser.LABEL_DSCP_EXCEPT = 20;
PolicyParser.LABEL_DSCP_MATCH = 21;
PolicyParser.LABEL_DSCP_SET = 22;
PolicyParser.LABEL_ENCAPSULATE = 23;
PolicyParser.LABEL_ETHER_TYPE = 24;
PolicyParser.LABEL_EXPIRATION = 25;
PolicyParser.LABEL_FILTER_TERM = 26;
PolicyParser.LABEL_FLEXIBLE_MATCH_RANGE = 27;
PolicyParser.LABEL_FORWARDING_CLASS = 28;
PolicyParser.LABEL_FORWARDING_CLASS_EXCEPT = 29;
PolicyParser.LABEL_FRAGMENT_OFFSET = 30;
PolicyParser.LABEL_HEX = 31;
PolicyParser.LABEL_HOP_LIMIT = 32;
PolicyParser.LABEL_APPLY_GROUPS = 33;
PolicyParser.LABEL_APPLY_GROUPS_EXCEPT = 34;
PolicyParser.LABEL_ICMP_TYPE = 35;
PolicyParser.LABEL_ICMP_CODE = 36;
PolicyParser.LABEL_LOGGING = 37;
PolicyParser.LABEL_LOG_LIMIT = 38;
PolicyParser.LABEL_LOG_NAME = 39;
PolicyParser.LABEL_LOSS_PRIORITY = 40;
PolicyParser.LABEL_NEXT_IP = 41;
PolicyParser.LABEL_OPTION = 42;
PolicyParser.LABEL_OWNER = 43;
PolicyParser.LABEL_PACKET_LEN = 44;
PolicyParser.LABEL_PLATFORM = 45;
PolicyParser.LABEL_PLATFORMEXCLUDE = 46;
PolicyParser.LABEL_POLICER = 47;
PolicyParser.LABEL_PORT = 48;
PolicyParser.LABEL_PORT_MIRROR = 49;
PolicyParser.LABEL_PRECEDENCE = 50;
PolicyParser.LABEL_PRIORITY = 51;
PolicyParser.LABEL_PROTOCOL = 52;
PolicyParser.LABEL_PROTOCOL_EXCEPT = 53;
PolicyParser.LABEL_QOS = 54;
PolicyParser.LABEL_PAN_APPLICATION = 55;
PolicyParser.LABEL_ROUTING_INSTANCE = 56;
PolicyParser.LABEL_SADDR = 57;
PolicyParser.LABEL_SADDREXCLUDE = 58;
PolicyParser.LABEL_SINTERFACE = 59;
PolicyParser.LABEL_SPFX = 60;
PolicyParser.LABEL_ESPFX = 61;
PolicyParser.LABEL_SPORT = 62;
PolicyParser.LABEL_STAG = 63;
PolicyParser.LABEL_SZONE = 64;
PolicyParser.LABEL_TARGET = 65;
PolicyParser.LABEL_TARGET_RESOURCES = 66;
PolicyParser.LABEL_TARGET_SERVICE_ACCOUNTS = 67;
PolicyParser.LABEL_TIMEOUT = 68;
PolicyParser.LABEL_TRAFFIC_CLASS_COUNT = 69;
PolicyParser.LABEL_TRAFFIC_TYPE = 70;
PolicyParser.LABEL_TTL = 71;
PolicyParser.LABEL_VERBATIM = 72;
PolicyParser.LABEL_VPN = 73;
PolicyParser.LOG_LIMIT = 74;
PolicyParser.ESCAPED_STRING = 75;
PolicyParser.DOUBLE_QUOTED_STRING = 76;
PolicyParser.DSCP_RANGE = 77;
PolicyParser.DATE_YMD = 78;
PolicyParser.INTEGER_RANGE = 79;
PolicyParser.DSCP = 80;
PolicyParser.HEX = 81;
PolicyParser.INTEGER = 82;
PolicyParser.STRING = 83;
PolicyParser.SYM_COLON = 84;
PolicyParser.SYM_LBRACE = 85;
PolicyParser.SYM_RBRACE = 86;
PolicyParser.SYM_LBRACKET = 87;
PolicyParser.SYM_RBRACKET = 88;
PolicyParser.LINE_COMMENT = 89;
PolicyParser.WS = 90;

PolicyParser.RULE_policy = 0;
PolicyParser.RULE_filter = 1;
PolicyParser.RULE_term_list = 2;
PolicyParser.RULE_header = 3;
PolicyParser.RULE_term = 4;
PolicyParser.RULE_rule_list = 5;
PolicyParser.RULE_policy_rule = 6;
PolicyParser.RULE_value_rule = 7;
PolicyParser.RULE_value_lhs = 8;
PolicyParser.RULE_value_list_rule = 9;
PolicyParser.RULE_value_list_lhs = 10;
PolicyParser.RULE_tuple_list_rule = 11;
PolicyParser.RULE_tuple_list_lhs = 12;
PolicyParser.RULE_flexible_match_rule = 13;
PolicyParser.RULE_flexible_match_lhs = 14;
PolicyParser.RULE_verbatim_rule = 15;
PolicyParser.RULE_verbatim_lhs = 16;
PolicyParser.RULE_vpn_rule = 17;
PolicyParser.RULE_vpn_lhs = 18;
PolicyParser.RULE_zero_or_more_tuples = 19;
PolicyParser.RULE_tuple = 20;
PolicyParser.RULE_flex_match_key_values = 21;
PolicyParser.RULE_flex_match_pair = 22;
PolicyParser.RULE_value = 23;

class PolicyContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PolicyParser.RULE_policy;
    }

	EOF() {
	    return this.getToken(PolicyParser.EOF, 0);
	};

	filter = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(FilterContext);
	    } else {
	        return this.getTypedRuleContext(FilterContext,i);
	    }
	};

	accept(visitor) {
	    if ( visitor instanceof PolicyVisitor ) {
	        return visitor.visitPolicy(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class FilterContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PolicyParser.RULE_filter;
    }

	header() {
	    return this.getTypedRuleContext(HeaderContext,0);
	};

	term_list() {
	    return this.getTypedRuleContext(Term_listContext,0);
	};

	accept(visitor) {
	    if ( visitor instanceof PolicyVisitor ) {
	        return visitor.visitFilter(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Term_listContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PolicyParser.RULE_term_list;
    }

	term = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(TermContext);
	    } else {
	        return this.getTypedRuleContext(TermContext,i);
	    }
	};

	accept(visitor) {
	    if ( visitor instanceof PolicyVisitor ) {
	        return visitor.visitTerm_list(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class HeaderContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PolicyParser.RULE_header;
    }

	KW_HEADER() {
	    return this.getToken(PolicyParser.KW_HEADER, 0);
	};

	SYM_LBRACE() {
	    return this.getToken(PolicyParser.SYM_LBRACE, 0);
	};

	rule_list() {
	    return this.getTypedRuleContext(Rule_listContext,0);
	};

	SYM_RBRACE() {
	    return this.getToken(PolicyParser.SYM_RBRACE, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof PolicyVisitor ) {
	        return visitor.visitHeader(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class TermContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PolicyParser.RULE_term;
        this.term_name = null;
    }

	KW_TERM() {
	    return this.getToken(PolicyParser.KW_TERM, 0);
	};

	SYM_LBRACE() {
	    return this.getToken(PolicyParser.SYM_LBRACE, 0);
	};

	rule_list() {
	    return this.getTypedRuleContext(Rule_listContext,0);
	};

	SYM_RBRACE() {
	    return this.getToken(PolicyParser.SYM_RBRACE, 0);
	};

	STRING() {
	    return this.getToken(PolicyParser.STRING, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof PolicyVisitor ) {
	        return visitor.visitTerm(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Rule_listContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PolicyParser.RULE_rule_list;
    }

	policy_rule = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(Policy_ruleContext);
	    } else {
	        return this.getTypedRuleContext(Policy_ruleContext,i);
	    }
	};

	accept(visitor) {
	    if ( visitor instanceof PolicyVisitor ) {
	        return visitor.visitRule_list(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Policy_ruleContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PolicyParser.RULE_policy_rule;
    }

	value_rule() {
	    return this.getTypedRuleContext(Value_ruleContext,0);
	};

	value_list_rule() {
	    return this.getTypedRuleContext(Value_list_ruleContext,0);
	};

	tuple_list_rule() {
	    return this.getTypedRuleContext(Tuple_list_ruleContext,0);
	};

	flexible_match_rule() {
	    return this.getTypedRuleContext(Flexible_match_ruleContext,0);
	};

	verbatim_rule() {
	    return this.getTypedRuleContext(Verbatim_ruleContext,0);
	};

	vpn_rule() {
	    return this.getTypedRuleContext(Vpn_ruleContext,0);
	};

	accept(visitor) {
	    if ( visitor instanceof PolicyVisitor ) {
	        return visitor.visitPolicy_rule(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Value_ruleContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PolicyParser.RULE_value_rule;
    }

	value_lhs() {
	    return this.getTypedRuleContext(Value_lhsContext,0);
	};

	SYM_COLON = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PolicyParser.SYM_COLON);
	    } else {
	        return this.getToken(PolicyParser.SYM_COLON, i);
	    }
	};


	value() {
	    return this.getTypedRuleContext(ValueContext,0);
	};

	accept(visitor) {
	    if ( visitor instanceof PolicyVisitor ) {
	        return visitor.visitValue_rule(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Value_lhsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PolicyParser.RULE_value_lhs;
    }

	LABEL_RESTRICT_ADDRESS_FAMILY() {
	    return this.getToken(PolicyParser.LABEL_RESTRICT_ADDRESS_FAMILY, 0);
	};

	LABEL_ROUTING_INSTANCE() {
	    return this.getToken(PolicyParser.LABEL_ROUTING_INSTANCE, 0);
	};

	LABEL_LOSS_PRIORITY() {
	    return this.getToken(PolicyParser.LABEL_LOSS_PRIORITY, 0);
	};

	LABEL_NEXT_IP() {
	    return this.getToken(PolicyParser.LABEL_NEXT_IP, 0);
	};

	LABEL_ENCAPSULATE() {
	    return this.getToken(PolicyParser.LABEL_ENCAPSULATE, 0);
	};

	LABEL_PORT_MIRROR() {
	    return this.getToken(PolicyParser.LABEL_PORT_MIRROR, 0);
	};

	LABEL_PRIORITY() {
	    return this.getToken(PolicyParser.LABEL_PRIORITY, 0);
	};

	LABEL_PACKET_LEN() {
	    return this.getToken(PolicyParser.LABEL_PACKET_LEN, 0);
	};

	LABEL_FRAGMENT_OFFSET() {
	    return this.getToken(PolicyParser.LABEL_FRAGMENT_OFFSET, 0);
	};

	LABEL_HOP_LIMIT() {
	    return this.getToken(PolicyParser.LABEL_HOP_LIMIT, 0);
	};

	LABEL_DSCP_SET() {
	    return this.getToken(PolicyParser.LABEL_DSCP_SET, 0);
	};

	LABEL_LOGGING() {
	    return this.getToken(PolicyParser.LABEL_LOGGING, 0);
	};

	LABEL_POLICER() {
	    return this.getToken(PolicyParser.LABEL_POLICER, 0);
	};

	LABEL_LOG_LIMIT() {
	    return this.getToken(PolicyParser.LABEL_LOG_LIMIT, 0);
	};

	LABEL_ACTION() {
	    return this.getToken(PolicyParser.LABEL_ACTION, 0);
	};

	LABEL_COUNTER() {
	    return this.getToken(PolicyParser.LABEL_COUNTER, 0);
	};

	LABEL_TRAFFIC_CLASS_COUNT() {
	    return this.getToken(PolicyParser.LABEL_TRAFFIC_CLASS_COUNT, 0);
	};

	LABEL_EXPIRATION() {
	    return this.getToken(PolicyParser.LABEL_EXPIRATION, 0);
	};

	LABEL_COMMENT() {
	    return this.getToken(PolicyParser.LABEL_COMMENT, 0);
	};

	LABEL_OWNER() {
	    return this.getToken(PolicyParser.LABEL_OWNER, 0);
	};

	LABEL_QOS() {
	    return this.getToken(PolicyParser.LABEL_QOS, 0);
	};

	LABEL_DINTERFACE() {
	    return this.getToken(PolicyParser.LABEL_DINTERFACE, 0);
	};

	LABEL_SINTERFACE() {
	    return this.getToken(PolicyParser.LABEL_SINTERFACE, 0);
	};

	LABEL_TIMEOUT() {
	    return this.getToken(PolicyParser.LABEL_TIMEOUT, 0);
	};

	LABEL_TTL() {
	    return this.getToken(PolicyParser.LABEL_TTL, 0);
	};

	LABEL_FILTER_TERM() {
	    return this.getToken(PolicyParser.LABEL_FILTER_TERM, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof PolicyVisitor ) {
	        return visitor.visitValue_lhs(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Value_list_ruleContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PolicyParser.RULE_value_list_rule;
    }

	value_list_lhs() {
	    return this.getTypedRuleContext(Value_list_lhsContext,0);
	};

	SYM_COLON = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PolicyParser.SYM_COLON);
	    } else {
	        return this.getToken(PolicyParser.SYM_COLON, i);
	    }
	};


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

	accept(visitor) {
	    if ( visitor instanceof PolicyVisitor ) {
	        return visitor.visitValue_list_rule(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Value_list_lhsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PolicyParser.RULE_value_list_lhs;
    }

	LABEL_TARGET() {
	    return this.getToken(PolicyParser.LABEL_TARGET, 0);
	};

	LABEL_PRECEDENCE() {
	    return this.getToken(PolicyParser.LABEL_PRECEDENCE, 0);
	};

	LABEL_FORWARDING_CLASS() {
	    return this.getToken(PolicyParser.LABEL_FORWARDING_CLASS, 0);
	};

	LABEL_FORWARDING_CLASS_EXCEPT() {
	    return this.getToken(PolicyParser.LABEL_FORWARDING_CLASS_EXCEPT, 0);
	};

	LABEL_ICMP_TYPE() {
	    return this.getToken(PolicyParser.LABEL_ICMP_TYPE, 0);
	};

	LABEL_ICMP_CODE() {
	    return this.getToken(PolicyParser.LABEL_ICMP_CODE, 0);
	};

	LABEL_DSCP_EXCEPT() {
	    return this.getToken(PolicyParser.LABEL_DSCP_EXCEPT, 0);
	};

	LABEL_DSCP_MATCH() {
	    return this.getToken(PolicyParser.LABEL_DSCP_MATCH, 0);
	};

	LABEL_ADDREXCLUDE() {
	    return this.getToken(PolicyParser.LABEL_ADDREXCLUDE, 0);
	};

	LABEL_DADDREXCLUDE() {
	    return this.getToken(PolicyParser.LABEL_DADDREXCLUDE, 0);
	};

	LABEL_SADDREXCLUDE() {
	    return this.getToken(PolicyParser.LABEL_SADDREXCLUDE, 0);
	};

	LABEL_PROTOCOL_EXCEPT() {
	    return this.getToken(PolicyParser.LABEL_PROTOCOL_EXCEPT, 0);
	};

	LABEL_DPFX() {
	    return this.getToken(PolicyParser.LABEL_DPFX, 0);
	};

	LABEL_EDPFX() {
	    return this.getToken(PolicyParser.LABEL_EDPFX, 0);
	};

	LABEL_SPFX() {
	    return this.getToken(PolicyParser.LABEL_SPFX, 0);
	};

	LABEL_ESPFX() {
	    return this.getToken(PolicyParser.LABEL_ESPFX, 0);
	};

	LABEL_ADDR() {
	    return this.getToken(PolicyParser.LABEL_ADDR, 0);
	};

	LABEL_DADDR() {
	    return this.getToken(PolicyParser.LABEL_DADDR, 0);
	};

	LABEL_SADDR() {
	    return this.getToken(PolicyParser.LABEL_SADDR, 0);
	};

	LABEL_DPORT() {
	    return this.getToken(PolicyParser.LABEL_DPORT, 0);
	};

	LABEL_PORT() {
	    return this.getToken(PolicyParser.LABEL_PORT, 0);
	};

	LABEL_SPORT() {
	    return this.getToken(PolicyParser.LABEL_SPORT, 0);
	};

	LABEL_PROTOCOL() {
	    return this.getToken(PolicyParser.LABEL_PROTOCOL, 0);
	};

	LABEL_DTAG() {
	    return this.getToken(PolicyParser.LABEL_DTAG, 0);
	};

	LABEL_STAG() {
	    return this.getToken(PolicyParser.LABEL_STAG, 0);
	};

	LABEL_TARGET_SERVICE_ACCOUNTS() {
	    return this.getToken(PolicyParser.LABEL_TARGET_SERVICE_ACCOUNTS, 0);
	};

	LABEL_ETHER_TYPE() {
	    return this.getToken(PolicyParser.LABEL_ETHER_TYPE, 0);
	};

	LABEL_TRAFFIC_TYPE() {
	    return this.getToken(PolicyParser.LABEL_TRAFFIC_TYPE, 0);
	};

	LABEL_OPTION() {
	    return this.getToken(PolicyParser.LABEL_OPTION, 0);
	};

	LABEL_DZONE() {
	    return this.getToken(PolicyParser.LABEL_DZONE, 0);
	};

	LABEL_SZONE() {
	    return this.getToken(PolicyParser.LABEL_SZONE, 0);
	};

	LABEL_PAN_APPLICATION() {
	    return this.getToken(PolicyParser.LABEL_PAN_APPLICATION, 0);
	};

	LABEL_PLATFORM() {
	    return this.getToken(PolicyParser.LABEL_PLATFORM, 0);
	};

	LABEL_PLATFORMEXCLUDE() {
	    return this.getToken(PolicyParser.LABEL_PLATFORMEXCLUDE, 0);
	};

	LABEL_APPLY_GROUPS() {
	    return this.getToken(PolicyParser.LABEL_APPLY_GROUPS, 0);
	};

	LABEL_APPLY_GROUPS_EXCEPT() {
	    return this.getToken(PolicyParser.LABEL_APPLY_GROUPS_EXCEPT, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof PolicyVisitor ) {
	        return visitor.visitValue_list_lhs(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Tuple_list_ruleContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PolicyParser.RULE_tuple_list_rule;
    }

	tuple_list_lhs() {
	    return this.getTypedRuleContext(Tuple_list_lhsContext,0);
	};

	SYM_COLON = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PolicyParser.SYM_COLON);
	    } else {
	        return this.getToken(PolicyParser.SYM_COLON, i);
	    }
	};


	zero_or_more_tuples() {
	    return this.getTypedRuleContext(Zero_or_more_tuplesContext,0);
	};

	accept(visitor) {
	    if ( visitor instanceof PolicyVisitor ) {
	        return visitor.visitTuple_list_rule(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Tuple_list_lhsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PolicyParser.RULE_tuple_list_lhs;
    }

	LABEL_TARGET_RESOURCES() {
	    return this.getToken(PolicyParser.LABEL_TARGET_RESOURCES, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof PolicyVisitor ) {
	        return visitor.visitTuple_list_lhs(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Flexible_match_ruleContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PolicyParser.RULE_flexible_match_rule;
    }

	flexible_match_lhs() {
	    return this.getTypedRuleContext(Flexible_match_lhsContext,0);
	};

	SYM_COLON = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PolicyParser.SYM_COLON);
	    } else {
	        return this.getToken(PolicyParser.SYM_COLON, i);
	    }
	};


	flex_match_key_values() {
	    return this.getTypedRuleContext(Flex_match_key_valuesContext,0);
	};

	accept(visitor) {
	    if ( visitor instanceof PolicyVisitor ) {
	        return visitor.visitFlexible_match_rule(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Flexible_match_lhsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PolicyParser.RULE_flexible_match_lhs;
    }

	LABEL_FLEXIBLE_MATCH_RANGE() {
	    return this.getToken(PolicyParser.LABEL_FLEXIBLE_MATCH_RANGE, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof PolicyVisitor ) {
	        return visitor.visitFlexible_match_lhs(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Verbatim_ruleContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PolicyParser.RULE_verbatim_rule;
        this.platform = null;
        this.text = null;
    }

	verbatim_lhs() {
	    return this.getTypedRuleContext(Verbatim_lhsContext,0);
	};

	SYM_COLON = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PolicyParser.SYM_COLON);
	    } else {
	        return this.getToken(PolicyParser.SYM_COLON, i);
	    }
	};


	STRING() {
	    return this.getToken(PolicyParser.STRING, 0);
	};

	DOUBLE_QUOTED_STRING() {
	    return this.getToken(PolicyParser.DOUBLE_QUOTED_STRING, 0);
	};

	ESCAPED_STRING() {
	    return this.getToken(PolicyParser.ESCAPED_STRING, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof PolicyVisitor ) {
	        return visitor.visitVerbatim_rule(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Verbatim_lhsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PolicyParser.RULE_verbatim_lhs;
    }

	LABEL_VERBATIM() {
	    return this.getToken(PolicyParser.LABEL_VERBATIM, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof PolicyVisitor ) {
	        return visitor.visitVerbatim_lhs(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Vpn_ruleContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PolicyParser.RULE_vpn_rule;
        this.name = null;
        this.pair_policy = null;
    }

	vpn_lhs() {
	    return this.getTypedRuleContext(Vpn_lhsContext,0);
	};

	SYM_COLON = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PolicyParser.SYM_COLON);
	    } else {
	        return this.getToken(PolicyParser.SYM_COLON, i);
	    }
	};


	STRING = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PolicyParser.STRING);
	    } else {
	        return this.getToken(PolicyParser.STRING, i);
	    }
	};


	accept(visitor) {
	    if ( visitor instanceof PolicyVisitor ) {
	        return visitor.visitVpn_rule(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Vpn_lhsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PolicyParser.RULE_vpn_lhs;
    }

	LABEL_VPN() {
	    return this.getToken(PolicyParser.LABEL_VPN, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof PolicyVisitor ) {
	        return visitor.visitVpn_lhs(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Zero_or_more_tuplesContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PolicyParser.RULE_zero_or_more_tuples;
    }

	SYM_LBRACKET() {
	    return this.getToken(PolicyParser.SYM_LBRACKET, 0);
	};

	zero_or_more_tuples() {
	    return this.getTypedRuleContext(Zero_or_more_tuplesContext,0);
	};

	SYM_RBRACKET() {
	    return this.getToken(PolicyParser.SYM_RBRACKET, 0);
	};

	tuple() {
	    return this.getTypedRuleContext(TupleContext,0);
	};

	accept(visitor) {
	    if ( visitor instanceof PolicyVisitor ) {
	        return visitor.visitZero_or_more_tuples(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class TupleContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PolicyParser.RULE_tuple;
    }

	STRING = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PolicyParser.STRING);
	    } else {
	        return this.getToken(PolicyParser.STRING, i);
	    }
	};


	accept(visitor) {
	    if ( visitor instanceof PolicyVisitor ) {
	        return visitor.visitTuple(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Flex_match_key_valuesContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PolicyParser.RULE_flex_match_key_values;
    }

	flex_match_pair = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(Flex_match_pairContext);
	    } else {
	        return this.getTypedRuleContext(Flex_match_pairContext,i);
	    }
	};

	accept(visitor) {
	    if ( visitor instanceof PolicyVisitor ) {
	        return visitor.visitFlex_match_key_values(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Flex_match_pairContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PolicyParser.RULE_flex_match_pair;
    }

	STRING = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PolicyParser.STRING);
	    } else {
	        return this.getToken(PolicyParser.STRING, i);
	    }
	};


	HEX() {
	    return this.getToken(PolicyParser.HEX, 0);
	};

	INTEGER() {
	    return this.getToken(PolicyParser.INTEGER, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof PolicyVisitor ) {
	        return visitor.visitFlex_match_pair(this);
	    } else {
	        return visitor.visitChildren(this);
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
        this.ruleIndex = PolicyParser.RULE_value;
    }

	LOG_LIMIT() {
	    return this.getToken(PolicyParser.LOG_LIMIT, 0);
	};

	DATE_YMD() {
	    return this.getToken(PolicyParser.DATE_YMD, 0);
	};

	INTEGER() {
	    return this.getToken(PolicyParser.INTEGER, 0);
	};

	INTEGER_RANGE() {
	    return this.getToken(PolicyParser.INTEGER_RANGE, 0);
	};

	DOUBLE_QUOTED_STRING() {
	    return this.getToken(PolicyParser.DOUBLE_QUOTED_STRING, 0);
	};

	DSCP() {
	    return this.getToken(PolicyParser.DSCP, 0);
	};

	DSCP_RANGE() {
	    return this.getToken(PolicyParser.DSCP_RANGE, 0);
	};

	STRING() {
	    return this.getToken(PolicyParser.STRING, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof PolicyVisitor ) {
	        return visitor.visitValue(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}




PolicyParser.PolicyContext = PolicyContext; 
PolicyParser.FilterContext = FilterContext; 
PolicyParser.Term_listContext = Term_listContext; 
PolicyParser.HeaderContext = HeaderContext; 
PolicyParser.TermContext = TermContext; 
PolicyParser.Rule_listContext = Rule_listContext; 
PolicyParser.Policy_ruleContext = Policy_ruleContext; 
PolicyParser.Value_ruleContext = Value_ruleContext; 
PolicyParser.Value_lhsContext = Value_lhsContext; 
PolicyParser.Value_list_ruleContext = Value_list_ruleContext; 
PolicyParser.Value_list_lhsContext = Value_list_lhsContext; 
PolicyParser.Tuple_list_ruleContext = Tuple_list_ruleContext; 
PolicyParser.Tuple_list_lhsContext = Tuple_list_lhsContext; 
PolicyParser.Flexible_match_ruleContext = Flexible_match_ruleContext; 
PolicyParser.Flexible_match_lhsContext = Flexible_match_lhsContext; 
PolicyParser.Verbatim_ruleContext = Verbatim_ruleContext; 
PolicyParser.Verbatim_lhsContext = Verbatim_lhsContext; 
PolicyParser.Vpn_ruleContext = Vpn_ruleContext; 
PolicyParser.Vpn_lhsContext = Vpn_lhsContext; 
PolicyParser.Zero_or_more_tuplesContext = Zero_or_more_tuplesContext; 
PolicyParser.TupleContext = TupleContext; 
PolicyParser.Flex_match_key_valuesContext = Flex_match_key_valuesContext; 
PolicyParser.Flex_match_pairContext = Flex_match_pairContext; 
PolicyParser.ValueContext = ValueContext; 
