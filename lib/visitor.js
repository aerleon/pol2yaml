import Enum from './enum.js';
import PolicyParser from '../antlr/PolicyParser.js';
import PolicyVisitor from '../antlr/PolicyVisitor.js';


// Model
export class Filter {
    before_comment = null
    after_comment = null
    header = null
    terms = null

    toYAMLNode(doc) {
        const header_node = this.header?.toYAMLNode(doc) ?? null;
        const term_nodes = this.terms?.map(term => term.toYAMLNode(doc)) ?? null;
        const filter_node = doc.createNode({ header: header_node, terms: term_nodes });

        if (this.before_comment ?? false) {
            filter_node.commentBefore = this.before_comment;
        }
        if (this.after_comment ?? false) {
            filter_node.comment = this.after_comment;
        }

        return filter_node;
    }

    toJSON() {
        const { header, terms } = this;
        return { header, terms };
    }
}

export class Header {
    before_comment = null
    rules = {}

    toYAMLNode(doc) {
        const node = doc.createNode(this);

        if (this.before_comment ?? false) {
            node.commentBefore = this.before_comment;
        }

        return node;
    }

    toJSON() {
        return this.rules;
    }
}


export class Term {
    before_comment = null
    after_comment = null
    name = null
    rules = {}

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
        const { name } = this;
        return {
            name,
            ...this.rules
        };
    }
}

export class IncludeTerm extends Term {

    toJSON() {
        return this.rules;
    }
}


export class Rule {
    type = null
    data = null

    toJSON() {
        return this.data;
    }
}


class ArrayWithContains extends Array {
}
ArrayWithContains.prototype.contains = Array.prototype.includes;

// Examine the current context and preserve its original textual representation
// if and only if there are comments within it.
const line_comment_filter = new ArrayWithContains();
line_comment_filter.push(PolicyParser.LINE_COMMENT);

function preserve(ctx) {
    const tokens = ctx.parser.getTokenStream();

    const comment_tokens = tokens.getTokens(ctx.start.tokenIndex, ctx.stop.tokenIndex + 1, line_comment_filter);
    if (comment_tokens.length) {
        const chars = tokens.tokenSource.inputStream;
        return ` [pol2yaml] The following term contained comments. Original text:
${chars.getText(ctx.start.start, ctx.stop.stop)}`;
    }
}

// collate rules within a Term or Header
// map-like and string-like rules are converted into a map or string representation here
// collation rules like "last wins" are applied here
// TODO will generate warnings if any shadowed rules are discarded
function collate(rules) {
    const result = {};
    for (const rule of rules) {
        const rule_key = rule.type[1];
        const collation = rule.type[2]?.join_type ?? JoinType.default;
        let platform = null;

        // preprocess map-like rules into mappings here (TARGET, VERBATIM)
        // preprocess string-like rules into strings here (COMMENT, VERBATIM)
        if (collation === JoinType.STRING_CONCAT) {
            rule.data = rule.data[0];

        } else if (rule.type[2]?.tuple_list) {
            rule.data = rule.data[0][0];

        } else if (rule.type[2]?.map) {
            platform = rule.data[0];
            let rhs = rule.data.slice(1);
            if (collation === JoinType.PLATFORM_STRING_CONCAT) {
                rhs = rhs[0];
            }
            rule.data = { [platform]: rhs };
        }

        // assemble result
        if (Object.hasOwn(result, rule_key)) {

            // rule type has already been encountered
            const result_rule = result[rule_key];

            switch (collation) {
                default:
                case JoinType.LIST_APPEND:
                    result_rule.data.push(...rule.data);
                    break;

                case JoinType.STRING_CONCAT:
                    // (COMMENT)
                    result_rule.data += `\n${rule.data}`;
                    break;

                case JoinType.LAST_WINS:
                    // overwrite
                    // warn user
                    console.warn(`WARNING: pol2yaml ignoring dead code: ${rule_key}:: ${JSON.stringify(result_rule)}`);

                    result_rule.data = rule.data;
                    break;

                case JoinType.PLATFORM_FIRST_WINS:
                    // (TARGET)
                    if (Object.hasOwn(result_rule.data, platform)) {
                        // discard rule
                        // warn user
                        console.warn(`WARNING: pol2yaml ignoring dead code: ${rule.type[1]}:: ${JSON.stringify(rule)}`);

                    } else {
                        result_rule.data[platform] = rule.data[platform];
                    }
                    break;

                case JoinType.PLATFORM_STRING_CONCAT:
                    // (VERBATIM)
                    if (Object.hasOwn(result_rule.data, platform)) {
                        result_rule.data[platform] += `\n${rule.data[platform]}`;
                    } else {
                        result_rule.data[platform] = rule.data[platform];
                    }
                    break;
            }

        } else {
            // rule type has not already been encountered
            result[rule_key] = rule;
        }
    }
    return result;
}

// collapse lists
// - most lists should be collapsed
// - some lists cannot be collapsed
// - long lists should not be collapsed
// - map/append types have 2nd-level lists
function collapse(rules) {

    const collapse = list => list.join(' ');

    for (const rule_key in rules) {
        const rule = rules[rule_key];
        const collation = rule.type[2]?.join_type ?? JoinType.default;

        if (rule.type[2]?.no_collapse ?? false) {
            continue;
        }

        // special case for list of tuples
        if (rule.type[2]?.tuple_list) {

            rule.data = rule.data.map(tuple => `(${tuple[0]},${tuple[1]})`);
        } else if (Array.isArray(rule.data)) {
            rule.data = collapse(rule.data);

            // collapse each inner list
        } else if (rule.type[2]?.map && collation !== JoinType.PLATFORM_STRING_CONCAT) {
            for (const platform in rule.data) {
                rule.data[platform] = collapse(rule.data[platform]);
            }
        }
    }
}


function getTokensBetweenChildren(ctx, types) {
    const tokens = ctx.parser.getTokenStream();

    // map each inter-child gap to a comment string (or undefined)
    return ctx.children.slice(1).map((_, i) => {
        const comment_tokens = tokens.getTokens(
            ctx.children[i].stop.tokenIndex + 1,
            ctx.children[i + 1].start.tokenIndex,
            types
        );

        if (comment_tokens.length) {
            return comment_tokens.map(token => token.text.slice(1)).join('');
        }
    });
}

// similar to getTokensBetweenChildren but we include range 0-start
// note that EOF is technically a child production so end-EOF is implied
function getTokensOutsideChildren(ctx, types) {
    const comments = getTokensBetweenChildren(ctx, types);
    const tokens = ctx.parser.getTokenStream();
    const start_tokens = tokens.getTokens(0, ctx.children[0].start.tokenIndex, types);
    let start_text;
    if (start_tokens.length) {
        start_text = start_tokens.map(token => token.text.slice(1)).join('');
    }
    comments.unshift(start_text);
    return comments;
}

// recognized block comments appear at three levels:
// 1. in a term list: between terms
// 2. in a filter: between the header and term list
// 3. at the top level: between filter or at the start or at the end
function visitTopLevel(ctx) {
    if (!(this instanceof PolicyParseTreeVisitor)) {
        throw TypeError("visitTopLevel expects 'this' to be an instance of PolicyParseTreeVisitor");
    }

    const child_productions = this.visitChildren(ctx).slice(0, -1); // strip EOF

    // scan for comment tokens in the whole file, excluding "in-children" tokens
    // look for comment tokens in the pre-, inter-, and post- children token ranges
    // attach them to the child filters (before_comment)
    // any trailing comment becomes an after_comment on the final filter
    const comments = getTokensOutsideChildren(ctx, line_comment_filter);
    const before_comments = comments.slice(0, -1);
    const last_comment = comments.slice(-1)[0];

    before_comments.forEach((comments, i) => {
        if (comments ?? false) {
            // before_comment may already exist (or not)
            child_productions[i].before_comment = [comments, child_productions[i].before_comment].join('');
        }
    });

    if (last_comment ?? false) {
        const last_production = child_productions.slice(-1)[0];
        last_production.after_comment = [last_comment, last_production.after_comment].join('');
    }

    return child_productions;
}

export default class PolicyParseTreeVisitor extends PolicyVisitor {
    visitPolicy(ctx) {
        return visitTopLevel.call(this, ctx);
    }

    visitTerm_list_only(ctx) {
        return visitTopLevel.call(this, ctx);
    }

    visitFilter(ctx) {
        const [header, terms] = this.visitChildren(ctx);
        const filter = new Filter();
        filter.header = header;
        filter.terms = terms;

        // scan for comment tokens in the inter-children token range
        // attach any to the first term (before_comment)
        const [comments] = getTokensBetweenChildren(ctx, line_comment_filter);
        if (comments ?? false) {
            // before_comment may already exist (or not)
            filter.terms[0].before_comment = [comments, filter.terms[0].before_comment].join('');
        }

        return filter;
    }

    visitHeader(ctx) {
        const preserve_text = preserve(ctx);
        const child_productions = this.visitChildren(ctx);
        const header = new Header();
        header.before_comment = preserve_text ?? null;
        header.rules = child_productions[2];
        return header;
    }

    visitTerm_list(ctx) {
        const child_productions = this.visitChildren(ctx);

        // scan for comment tokens in the inter-children token ranges
        // attach any to the following child term (before_comment)
        getTokensBetweenChildren(ctx, line_comment_filter).forEach((comments, i) => {
            if (comments ?? false) {
                // before_comment may already exist (or not)
                child_productions[i + 1].before_comment = [comments, child_productions[i + 1].before_comment].join('');
            }
        });

        return child_productions;
    }

    visitTerm(ctx) {
        const preserve_text = preserve(ctx);
        const child_productions = this.visitChildren(ctx);
        const term = new Term();
        term.before_comment = preserve_text ?? null;
        term.name = child_productions[1]; // TODO use term_name
        term.rules = child_productions[3];
        return term;
    }

    visitRule_list(ctx) {
        const child_productions = this.visitChildren(ctx);
        const rules = collate(child_productions);
        collapse(rules);
        return rules;
    }

    visitPolicy_rule(ctx) {
        const child_productions = this.visitChildren(ctx)[0];
        const rule = new Rule();
        rule.type = RuleType.fromKey(child_productions[0]);
        rule.data = child_productions.slice(3);
        return rule;
    }

    visitValue_lhs(ctx) {
        return ctx.getText();
    }

    visitValue_list_lhs(ctx) {
        return ctx.getText();
    }

    visitTuple_list_lhs(ctx) {
        return ctx.getText();
    }

    visitFlexible_match_lhs(ctx) {
        return ctx.getText();
    }

    visitVerbatim_lhs(ctx) {
        return ctx.getText();
    }

    visitVpn_lhs(ctx) {
        return ctx.getText();
    }

    visitZero_or_more_tuples(ctx) {
        const child_productions = this.visitChildren(ctx);

        // empty case
        if (child_productions.length < 1) {
            return [];

        // single tuple case
        } else if (child_productions.length == 1) {
            return [child_productions];

        // list extension (no comma)
        } else if (child_productions.length == 2) {
            child_productions[0].push(child_productions[1]);
            return child_productions[0];

        // surrounded list
        } else if (child_productions[0].getText() == '[') {
            return child_productions[1];

        // list extension (comma)
        } else {
            child_productions[0].push(child_productions[2]);
            return child_productions[0];
        }
    }

    visitTuple(ctx) {
        const child_productions = this.visitChildren(ctx);
        // TODO assert STRING only
        return [child_productions[1], child_productions[3]];
    }

    visitValue(ctx) {
        let text = ctx.getText();
        // clean up values a bit here
        // - esc / dq strings: strip surrounding quotes, unescape
        // - ?
        switch (ctx.getChild(0).symbol.type) {
            case PolicyParser.ESCAPED_STRING:
                // unescape
                text = text.replaceAll("\\\"", "\"");
            // fallthru
            case PolicyParser.DOUBLE_QUOTED_STRING:
                // strip surrouding quotes
                text = text.slice(1, -1);
                break;
        }
        return text;
    }

    visitTerminal(ctx) {
        return ctx.getText();
    }
}



// default join_type is LIST_APPEND
export class JoinType extends Enum {
    static LIST_APPEND = new JoinType("LIST_APPEND")
    static STRING_CONCAT = new JoinType("STRING_CONCAT")
    static LAST_WINS = new JoinType("LAST_WINS")
    static PLATFORM_FIRST_WINS = new JoinType("PLATFORM_FIRST_WINS")
    static PLATFORM_STRING_CONCAT = new JoinType("PLATFORM_STRING_CONCAT")
}

// RuleType (VarType)
export class RuleType extends Enum {
    static COMMENT = new RuleType("COMMENT", "comment", { "join_type": JoinType.STRING_CONCAT })
    static COUNTER = new RuleType("COUNTER", "counter", { "join_type": JoinType.LAST_WINS })
    static ACTION = new RuleType("ACTION", "action")
    static SADDRESS = new RuleType("SADDRESS", "source-address")
    static DADDRESS = new RuleType("DADDRESS", "destination-address")
    static ADDRESS = new RuleType("ADDRESS", "address")
    static SPORT = new RuleType("SPORT", "source-port")
    static DPORT = new RuleType("DPORT", "destination-port")
    static PROTOCOL_EXCEPT = new RuleType("PROTOCOL_EXCEPT", "protocol-except")
    static OPTION = new RuleType("OPTION", "option", { "no_collapse": true })
    static PROTOCOL = new RuleType("PROTOCOL", "protocol")
    static SADDREXCLUDE = new RuleType("SADDREXCLUDE", "source-exclude")
    static DADDREXCLUDE = new RuleType("DADDREXCLUDE", "destination-exclude")
    static LOGGING = new RuleType("LOGGING", "logging")
    static QOS = new RuleType("QOS", "qos", { "join_type": JoinType.LAST_WINS })
    static POLICER = new RuleType("POLICER", "policer", { "join_type": JoinType.LAST_WINS })
    static PACKET_LEN = new RuleType("PACKET_LEN", "packet-length", { "join_type": JoinType.LAST_WINS })
    static FRAGMENT_OFFSET = new RuleType("FRAGMENT_OFFSET", "fragment-offset", { "join_type": JoinType.LAST_WINS })
    static ICMP_TYPE = new RuleType("ICMP_TYPE", "icmp-type")
    static SPFX = new RuleType("SPFX", "source-prefix")
    static DPFX = new RuleType("DPFX", "destination-prefix")
    static ETHER_TYPE = new RuleType("ETHER_TYPE", "ether-type")
    static TRAFFIC_TYPE = new RuleType("TRAFFIC_TYPE", "traffic-type")
    static VERBATIM = new RuleType("VERBATIM", "verbatim", { "join_type": JoinType.PLATFORM_STRING_CONCAT, "map": true })
    static LOSS_PRIORITY = new RuleType("LOSS_PRIORITY", "loss-priority", { "join_type": JoinType.LAST_WINS })
    static ROUTING_INSTANCE = new RuleType("ROUTING_INSTANCE", "routing-instance", { "join_type": JoinType.LAST_WINS })
    static PRECEDENCE = new RuleType("PRECEDENCE", "precedence", { "join_type": JoinType.LAST_WINS })
    static SINTERFACE = new RuleType("SINTERFACE", "source-interface", { "join_type": JoinType.LAST_WINS })
    static EXPIRATION = new RuleType("EXPIRATION", "expiration", { "join_type": JoinType.LAST_WINS })
    static DINTERFACE = new RuleType("DINTERFACE", "destination-interface", { "join_type": JoinType.LAST_WINS })
    static PLATFORM = new RuleType("PLATFORM", "platform")
    static PLATFORMEXCLUDE = new RuleType("PLATFORMEXCLUDE", "platform-exclude")
    static PORT = new RuleType("PORT", "port")
    static TIMEOUT = new RuleType("TIMEOUT", "timeout", { "join_type": JoinType.LAST_WINS })
    static OWNER = new RuleType("OWNER", "owner")
    static ADDREXCLUDE = new RuleType("ADDREXCLUDE", "address-exclude")
    static VPN = new RuleType("VPN", "vpn", { "join_type": JoinType.LAST_WINS })
    static APPLY_GROUPS = new RuleType("APPLY_GROUPS", "apply-groups")
    static APPLY_GROUPS_EXCEPT = new RuleType("APPLY_GROUPS_EXCEPT", "apply-groups-except")
    static DSCP_SET = new RuleType("DSCP_SET", "dscp-set", { "join_type": JoinType.LAST_WINS })
    static DSCP_MATCH = new RuleType("DSCP_MATCH", "dscp-match")
    static DSCP_EXCEPT = new RuleType("DSCP_EXCEPT", "dscp-except")
    static FORWARDING_CLASS = new RuleType("FORWARDING_CLASS", "forwarding-class", { "no_collapse": true })
    static STAG = new RuleType("STAG", "source-tag")
    static DTAG = new RuleType("DTAG", "destination-tag")
    static NEXT_IP = new RuleType("NEXT_IP", "next-ip", { "join_type": JoinType.LAST_WINS })
    static HOP_LIMIT = new RuleType("HOP_LIMIT", "hop-limit", { "join_type": JoinType.LAST_WINS })
    static LOG_NAME = new RuleType("LOG_NAME", "log_name", { "join_type": JoinType.LAST_WINS })
    static FLEXIBLE_MATCH_RANGE = new RuleType("FLEXIBLE_MATCH_RANGE", "flexible-match-range", { "join_type": JoinType.PLATFORM_FIRST_WINS, "map": true })
    static ESPFX = new RuleType("ESPFX", "source-prefix-except")
    static EDPFX = new RuleType("EDPFX", "destination-prefix-except")
    static FORWARDING_CLASS_EXCEPT = new RuleType("FORWARDING_CLASS_EXCEPT", "forwarding-class-except", { "no_collapse": true })
    static TRAFFIC_CLASS_COUNT = new RuleType("TRAFFIC_CLASS_COUNT", "traffic-class-count", { "join_type": JoinType.LAST_WINS })
    static PAN_APPLICATION = new RuleType("PAN_APPLICATION", "pan-application")
    static ICMP_CODE = new RuleType("ICMP_CODE", "icmp-code")
    static PRIORITY = new RuleType("PRIORITY", "priority", { "join_type": JoinType.LAST_WINS })
    static TTL = new RuleType("TTL", "ttl", { "join_type": JoinType.LAST_WINS })
    static LOG_LIMIT = new RuleType("LOG_LIMIT", "log-limit", { "join_type": JoinType.LAST_WINS })
    static TARGET_RESOURCES = new RuleType("TARGET_RESOURCES", "target-resources", { "tuple_list": true })
    static TARGET_SERVICE_ACCOUNTS = new RuleType("TARGET_SERVICE_ACCOUNTS", "target-service-accounts")
    static ENCAPSULATE = new RuleType("ENCAPSULATE", "encapsulate", { "join_type": JoinType.LAST_WINS })
    static FILTER_TERM = new RuleType("FILTER_TERM", "filter-term", { "join_type": JoinType.LAST_WINS })
    static RESTRICT_ADDRESS_FAMILY = new RuleType("RESTRICT_ADDRESS_FAMILY", "restrict-address-family", { "join_type": JoinType.LAST_WINS })
    static PORT_MIRROR = new RuleType("PORT_MIRROR", "port-mirror", { "join_type": JoinType.LAST_WINS })
    static SZONE = new RuleType("SZONE", "source-zone")
    static DZONE = new RuleType("DZONE", "destination-zone")
    static TARGET = new RuleType("TARGET", "target", { "join_type": JoinType.PLATFORM_FIRST_WINS, "map": true })
}
