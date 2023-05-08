import { Parser } from 'yaml';
import PolicyParser from './antlr/PolicyParser.js';
import PolicyVisitor from './antlr/PolicyVisitor.js';

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
    if (!!comment_tokens.length) {
        const chars = tokens.tokenSource.inputStream;
        return chars.getText(ctx.start.start, ctx.stop.stop);
    }
}

function collate(rules) {
    const result = {};
    for (const rule of rules) {
        const rule_key = rule.type[1];
        let platform = null;

        // preprocess map-like rules into mappings here (TARGET, VERBATIM)
        if (rule.type[2]?.map) {
            platform = rule.data[0];
            rule.data = { [platform]: rule.data.slice(1) };
        }

        // assemble result
        if (Object.hasOwn(result, rule_key)) {

            // rule type has already been encountered
            const collation = rule.type[2]?.join_type ?? JoinType.default;
            const result_rule = result[rule_key];

            switch (collation) {
                default:
                case JoinType.LIST_APPEND:
                    result_rule.data.push(...rule.data);
                    break;

                case JoinType.STRING_CONCAT:
                    // (COMMENT)
                    result_rule.data[0] += `\n${rule.data[0]}`;
                    break;

                case JoinType.LAST_WINS:
                    result_rule.data = rule.data;
                    break;

                case JoinType.PLATFORM_FIRST_WINS:
                    // (TARGET)
                    if (Object.hasOwn(result_rule.data, platform)) {
                        // discard rule
                    } else {
                        result_rule.data[platform] = rule.data[platform];
                    }
                    break;

                case JoinType.PLATFORM_STRING_CONCAT:
                    // (VERBATIM)
                    if (Object.hasOwn(result_rule.data, platform)) {
                        result_rule.data[platform][0] += `\n${rule.data[platform][0]}`;
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

// Model
export class Header {
    block_comment = null
    rules = {}
}


export class Term {
    block_comment = null
    name = null
    rules = {}
}


export class Rule {
    type = null
    data = null
}

// Notes on an enum-like pattern:
// - callers should be able to refer to RuleType.OPTION
// - RuleType.OPTION instanceof RuleType -> true
// - RuleType.XYZ cannot be added by caller (frozen), RuleType.OPTION cannot be overwritten (frozen)
// - new instances of RuleType cannot be created outside of the module
// - RuleType.X is never equal RuleType.Z
// - RuleType is iterable (in and of)

// enum.js
class Enum extends Array {
    constructor(...args) {
        args.forEach(arg => Object.freeze(arg));
        super(...args);
        // this._data = args;
        Object.freeze(this);
    }

    static get default() {
        return [...this][0];
    }

    static filter(...args) {
        return [...this].filter(...args);
    }

    static fromKey(key) {
        const match = this.filter(inst => inst[1] === key);
        if (match.length > 0) {
            return match[0];
        }
    }
}


Enum[Symbol.iterator] = function* () {
    for (const name in this) {
        yield this[name];
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
    static FLEXIBLE_MATCH_RANGE = new RuleType("FLEXIBLE_MATCH_RANGE", "flexible-match-range")
    static ESPFX = new RuleType("ESPFX", "source-prefix-except")
    static EDPFX = new RuleType("EDPFX", "destination-prefix-except")
    static FORWARDING_CLASS_EXCEPT = new RuleType("FORWARDING_CLASS_EXCEPT", "forwarding-class-except", { "no_collapse": true })
    static TRAFFIC_CLASS_COUNT = new RuleType("TRAFFIC_CLASS_COUNT", "traffic-class-count", { "join_type": JoinType.LAST_WINS })
    static PAN_APPLICATION = new RuleType("PAN_APPLICATION", "pan-application")
    static ICMP_CODE = new RuleType("ICMP_CODE", "icmp-code")
    static PRIORITY = new RuleType("PRIORITY", "priority", { "join_type": JoinType.LAST_WINS })
    static TTL = new RuleType("TTL", "ttl", { "join_type": JoinType.LAST_WINS })
    static LOG_LIMIT = new RuleType("LOG_LIMIT", "log-limit", { "join_type": JoinType.LAST_WINS })
    static TARGET_RESOURCES = new RuleType("TARGET_RESOURCES", "target-resources", { "no_collapse": true })
    static TARGET_SERVICE_ACCOUNTS = new RuleType("TARGET_SERVICE_ACCOUNTS", "target-service-accounts")
    static ENCAPSULATE = new RuleType("ENCAPSULATE", "encapsulate", { "join_type": JoinType.LAST_WINS })
    static FILTER_TERM = new RuleType("FILTER_TERM", "filter-term", { "join_type": JoinType.LAST_WINS })
    static RESTRICT_ADDRESS_FAMILY = new RuleType("RESTRICT_ADDRESS_FAMILY", "restrict-address-family", { "join_type": JoinType.LAST_WINS })
    static PORT_MIRROR = new RuleType("PORT_MIRROR", "port-mirror", { "join_type": JoinType.LAST_WINS })
    static SZONE = new RuleType("SZONE", "source-zone")
    static DZONE = new RuleType("DZONE", "destination-zone")
    static TARGET = new RuleType("TARGET", "target", { "join_type": JoinType.PLATFORM_FIRST_WINS, "map": true })
}


// class NoCollapse extends Enum {
//     static NO_COLLAPSE = new NoCollapse("NO_COLLAPSE")
// }

export default class PolicyParseTreeVisitor extends PolicyVisitor {
    visitPolicy(ctx) {
        return this.visitChildren(ctx).slice(0, -1); // strip EOF
    }

    visitFilter(ctx) {
        return this.visitChildren(ctx);
    }

    visitHeader(ctx) {
        const preserve_text = preserve(ctx);
        const child_productions = this.visitChildren(ctx);
        const header = new Header();
        header.block_comment = preserve_text ?? null;
        header.rules = child_productions[2];
        return header;
    }

    visitTerm_list(ctx) {
        return this.visitChildren(ctx);
    }

    visitTerm(ctx) {
        const preserve_text = preserve(ctx);
        const child_productions = this.visitChildren(ctx);
        const term = new Term();
        term.block_comment = preserve_text ?? null;
        term.name = child_productions[1]; // TODO use term_name
        term.rules = child_productions[3];
        return term;
    }

    visitRule_list(ctx) {
        const rules = this.visitChildren(ctx);
        return collate(rules);
    }

    visitPolicy_rule(ctx) {
        const child_productions = this.visitChildren(ctx)[0];
        const rule = new Rule();
        rule.type = RuleType.fromKey(child_productions[0]);
        rule.data = child_productions.slice(3);
        return rule;
    }

    // TODO can remove default implementations
    visitValue_rule(ctx) {
        return this.visitChildren(ctx);
    }

    visitValue_lhs(ctx) {
        return ctx.getText();
    }

    visitValue_list_rule(ctx) {
        return this.visitChildren(ctx);
    }

    visitValue_list_lhs(ctx) {
        return ctx.getText();
    }

    visitTuple_list_rule(ctx) {
        return this.visitChildren(ctx);
    }

    visitTuple_list_lhs(ctx) {
        return ctx.getText();
    }

    visitFlexible_match_rule(ctx) {
        return this.visitChildren(ctx);
    }

    visitFlexible_match_lhs(ctx) {
        return ctx.getText();
    }

    visitVerbatim_rule(ctx) {
        return this.visitChildren(ctx);
    }

    visitVerbatim_lhs(ctx) {
        return ctx.getText();
    }

    visitVpn_rule(ctx) {
        return this.visitChildren(ctx);
    }

    visitVpn_lhs(ctx) {
        return ctx.getText();
    }

    visitZero_or_more_tuples(ctx) {
        const child_productions = this.visitChildren(ctx);

        // There are five possible production types
        if (child_productions.length <= 1) {
            // zero or one case (children array pass-thru)
            return child_productions;

        } else if (child_productions.length == 2) {
            // two case (extend list)
            child_productions[0].push(child_productions[1]);
            return child_productions[0];

        } else if (child_productions[0].getText() == '[') {
            // three case (surrounded list)
            return child_productions[1];

        } else {
            // three case (extend list)
            child_productions[0].push(child_productions[2]);
            return child_productions[0];
        }
    }

    visitTuple(ctx) {
        const child_productions = this.visitChildren(ctx);
        // TODO assert STRING only
        return [child_productions[1], child_productions[3]];
    }

    visitFlex_match_key_values(ctx) {
        // TODO assert additional validations

        const child_productions = this.visitChildren(ctx);
        const result = {};
        for (const pair of child_productions) {
            result[pair[0]] = pair[1];
        }
        return result;
    }

    visitFlex_match_pair(ctx) {
        // : STRING (HEX | INTEGER | STRING)

        // TODO validate here
        return this.visitChildren(ctx);
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
                text = text.slice(1,-1);
                break;
        }
        return text;
    }

    visitTerminal(ctx) {
        return ctx.getText();
    }
}
