
// Notes on an enum-like pattern:
// - callers should be able to refer to RuleType.OPTION
// - RuleType.OPTION instanceof RuleType -> true
// - RuleType.XYZ cannot be added by caller (frozen), RuleType.OPTION cannot be overwritten (frozen)
// - new instances of RuleType cannot be created outside of the module
// - RuleType.X is never equal RuleType.Z
// - RuleType is iterable (in and of)

// enum.js
export default class Enum extends Array {
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