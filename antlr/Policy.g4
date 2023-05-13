grammar Policy;

policy
    : filter* eof
    ;

eof : EOF ;

filter
    : header term_list
    ;

term_list_only
    : term+ eof
    ;

term_list
    : term+
    ;

header
    : KW_HEADER '{' rule_list '}'
    ;

term
    : KW_TERM term_name=STRING '{' rule_list '}'
    ;

rule_list
    : policy_rule*
    ;

policy_rule
    : value_rule
    | value_list_rule
    | tuple_list_rule
    | flexible_match_rule
    | verbatim_rule
    | vpn_rule
    ;

value_rule
    : value_lhs ':' ':' value
    ;

value_lhs
    : 'restrict-address-family'
    | 'routing-instance'
    | 'loss-priority'
    | 'next-ip'
    | 'encapsulate'
    | 'port-mirror'
    | 'priority' //'PRIORITY',
    | 'packet-length' //'PACKET_LEN',
    | 'fragment-offset' //'FRAGMENT_OFFSET',
    | 'hop-limit' //'HOP_LIMIT',
    | 'dscp-set' //'DSCP_SET',
    | 'logging' //'LOGGING',
    | 'policer' //'POLICER',
    | 'log-limit' //'LOG_LIMIT',
    | 'action' //'ACTION',
    | 'counter' //'COUNTER',
    | 'traffic-class-count' //'TRAFFIC_CLASS_COUNT',
    | 'expiration' //'EXPIRATION',
    | 'comment' //'COMMENT',
    | 'owner' //'OWNER',
    | 'qos' //'QOS',
    | 'destination-interface' //'DINTERFACE',
    | 'source-interface' //'SINTERFACE',
    | 'timeout' //'TIMEOUT',
    | 'ttl' //'TTL',
    | 'filter-term' //'FILTER_TERM',
    ;

value_list_rule
    : value_list_lhs ':' ':' value*
    ;

value_list_lhs
    : 'target'
    | 'precedence'
    | 'forwarding-class'
    | 'forwarding-class-except'
    | 'icmp-type' //'ICMP_TYPE',
    | 'icmp-code' //'ICMP_CODE',
    | 'dscp-except' //'DSCP_EXCEPT',
    | 'dscp-match' //'DSCP_MATCH',
    | 'address-exclude' //'ADDREXCLUDE',
    | 'destination-exclude' //'DADDREXCLUDE',
    | 'source-exclude' //'SADDREXCLUDE',
    | 'protocol-except' //'PROTOCOL_EXCEPT',
    | 'destination-prefix' //'DPFX',
    | 'destination-prefix-except' //'EDPFX',
    | 'source-prefix' //'SPFX',
    | 'source-prefix-except' //'ESPFX',
    | 'address' //'ADDR',
    | 'destination-address' //'DADDR',
    | 'source-address' //'SADDR',
    | 'destination-port' //'DPORT',
    | 'port' //'PORT',
    | 'source-port' //'SPORT',
    | 'protocol' //'PROTOCOL',
    | 'destination-tag' //'DTAG',
    | 'source-tag' //'STAG',
    | 'target-service-accounts' //'TARGET_SERVICE_ACCOUNTS',
    | 'ether-type' //'ETHER_TYPE',
    | 'traffic-type' //'TRAFFIC_TYPE',
    | 'option' //'OPTION',
    | 'destination-zone' //'DZONE',
    | 'source-zone' //'SZONE',
    | 'pan-application' //'PAN_APPLICATION',
    | 'platform' //'PLATFORM',
    | 'platform-exclude' //'PLATFORMEXCLUDE',
    | 'apply-groups' //'APPLY_GROUPS',
    | 'apply-groups-except' //'APPLY_GROUPS_EXCEPT',
    ;

tuple_list_rule
    : tuple_list_lhs ':' ':' zero_or_more_tuples
    ;

tuple_list_lhs
    : 'target-resources' //'TARGET_RESOURCES',
    ;

flexible_match_rule
    : flexible_match_lhs ':' ':' STRING (HEX | INTEGER | STRING)
    ;

flexible_match_lhs
    : 'flexible-match-range' //'FLEXIBLE_MATCH_RANGE',
    ;

verbatim_rule
    : verbatim_lhs ':' ':' platform=STRING text=value
    ;

verbatim_lhs
    : 'verbatim' //'VERBATIM',
    ;

vpn_rule
    : vpn_lhs ':' ':' name=STRING pair_policy=STRING?
    ;

vpn_lhs
    : 'vpn' //'VPN',
    ;



// NOTE: Lovingly copied from policy.py, warts and all. The purpose of
// this grammar is to import policy files, which means parsing odd policy
// files that take advantage of the weirdness in the original grammar.
// Note that policy.py crashes on some weird inputs.
zero_or_more_tuples
    : '[' zero_or_more_tuples ']'
    | zero_or_more_tuples ',' tuple
    | zero_or_more_tuples tuple
    | tuple
    | 
    ;

tuple
    : '(' STRING ',' STRING ')'
    ;



// TOKENS

// TOKENS > Reserved Words
KW_HEADER : 'header';
KW_TERM : 'term';


// TOKENS > Reserved Rule (VarType) Labels
LABEL_ACTION : 'action';
LABEL_ADDR : 'address';
LABEL_ADDREXCLUDE : 'address-exclude';
LABEL_RESTRICT_ADDRESS_FAMILY : 'restrict-address-family';
LABEL_COMMENT : 'comment';
LABEL_COUNTER : 'counter';
LABEL_DADDR : 'destination-address';
LABEL_DADDREXCLUDE : 'destination-exclude';
LABEL_DINTERFACE : 'destination-interface';
LABEL_DPFX : 'destination-prefix';
LABEL_EDPFX : 'destination-prefix-except';
LABEL_DPORT : 'destination-port';
LABEL_DTAG : 'destination-tag';
LABEL_DZONE : 'destination-zone';
LABEL_DSCP_EXCEPT : 'dscp-except';
LABEL_DSCP_MATCH : 'dscp-match';
LABEL_DSCP_SET : 'dscp-set';
LABEL_ENCAPSULATE : 'encapsulate';
LABEL_ETHER_TYPE : 'ether-type';
LABEL_EXPIRATION : 'expiration';
LABEL_FILTER_TERM : 'filter-term';
LABEL_FLEXIBLE_MATCH_RANGE : 'flexible-match-range';
LABEL_FORWARDING_CLASS : 'forwarding-class';
LABEL_FORWARDING_CLASS_EXCEPT : 'forwarding-class-except';
LABEL_FRAGMENT_OFFSET : 'fragment-offset';
LABEL_HEX : 'hex';
LABEL_HOP_LIMIT : 'hop-limit';
LABEL_APPLY_GROUPS : 'apply-groups';
LABEL_APPLY_GROUPS_EXCEPT : 'apply-groups-except';
LABEL_ICMP_TYPE : 'icmp-type';
LABEL_ICMP_CODE : 'icmp-code';
LABEL_LOGGING : 'logging';
LABEL_LOG_LIMIT : 'log-limit';
LABEL_LOG_NAME : 'log_name';
LABEL_LOSS_PRIORITY : 'loss-priority';
LABEL_NEXT_IP : 'next-ip';
LABEL_OPTION : 'option';
LABEL_OWNER : 'owner';
LABEL_PACKET_LEN : 'packet-length';
LABEL_PLATFORM : 'platform';
LABEL_PLATFORMEXCLUDE : 'platform-exclude';
LABEL_POLICER : 'policer';
LABEL_PORT : 'port';
LABEL_PORT_MIRROR : 'port-mirror';
LABEL_PRECEDENCE : 'precedence';
LABEL_PRIORITY : 'priority';
LABEL_PROTOCOL : 'protocol';
LABEL_PROTOCOL_EXCEPT : 'protocol-except';
LABEL_QOS : 'qos';
LABEL_PAN_APPLICATION : 'pan-application';
LABEL_ROUTING_INSTANCE : 'routing-instance';
LABEL_SADDR : 'source-address';
LABEL_SADDREXCLUDE : 'source-exclude';
LABEL_SINTERFACE : 'source-interface';
LABEL_SPFX : 'source-prefix';
LABEL_ESPFX : 'source-prefix-except';
LABEL_SPORT : 'source-port';
LABEL_STAG : 'source-tag';
LABEL_SZONE : 'source-zone';
LABEL_TARGET : 'target';
LABEL_TARGET_RESOURCES : 'target-resources';
LABEL_TARGET_SERVICE_ACCOUNTS : 'target-service-accounts';
LABEL_TIMEOUT : 'timeout';
LABEL_TRAFFIC_CLASS_COUNT : 'traffic-class-count';
LABEL_TRAFFIC_TYPE : 'traffic-type';
LABEL_TTL : 'ttl';
LABEL_VERBATIM : 'verbatim';
LABEL_VPN : 'vpn';


// TOKENS > Values
value
    : LOG_LIMIT
    | DATE_YMD
    | INTEGER
    | INTEGER_RANGE
    | DOUBLE_QUOTED_STRING
    | DSCP
    | DSCP_RANGE
    | STRING
    ;

LOG_LIMIT
    : INTEGER '/' STRING
    ;

ESCAPED_STRING
    : '"' ~["\\]* ( '\\"' ~["\\]* )+ '"'
    ;

DOUBLE_QUOTED_STRING
    : '"' .*? '"'
    ;

DSCP_RANGE
    : DSCP '-' DSCP
    ;

DATE_YMD
    : INTEGER '-' INTEGER '-' INTEGER
    ;

INTEGER_RANGE
    : INTEGER '-' INTEGER
    ;

DSCP
    : ('b' | 'af' | 'be' | 'ef' | 'cs' ) [0-9]*
    ;

HEX
    : '0x' [a-fA-F0-9]+
    ;

INTEGER
    : [0-9]+
    ;

STRING
    : W ([-+.@/] | W)*
    ;

fragment W
    : [a-zA-Z0-9_]
    ;


// TOKENS > Symbols
SYM_COLON : ':';
SYM_LBRACE : '{';
SYM_RBRACE : '}';
SYM_LBRACKET : '[';
SYM_RBRACKET : ']';
SYM_COMMA : ',';
SYM_LPAREN : '(';
SYM_RPAREN : ')';


// TOKENS > Whitespace and Comments
LINE_COMMENT
    : '#' .*? ([\n\r]|EOF) -> channel(HIDDEN)
    ;

WS
    : [ \t\r\n] + -> skip
    ;
