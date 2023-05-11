
// Goals for this file:
// - callers should be able to refer to EnumSubclass.OPTION
// - EnumSubclass.OPTION instanceof EnumSubclass -> true
// - EnumSubclass.XYZ cannot be added by caller (frozen), EnumSubclass.OPTION cannot be overwritten (frozen)
// - new instances of EnumSubclass cannot be created outside of the module
// - EnumSubclass.X is never equal EnumSubclass.Z
// - EnumSubclass is iterable (in and of)

// class Enum
//
// Usage:
// class Color extends Enum {
//     static RED = new Color("RED");
//     static GREEN = new Color("GREEN");
//     static BLUE = new Color("BLUE");
// }
// 
// Methods:
// [Symbol.iterator]():
//   Static members defined on subclasses of Enum are iterable.
//
// Enum.default():
//   Returns the default enum member. Defaults to the first static
//   member but subclasses of Enum may override this method.
//
// Enum.filter(...args):
//   Calls Array.prototype.filter(...args) on the list of static members.
//
// Enum.fromKey(key):
//   Assumes that each static member has a unique lookup key defined
//   as member[1].
//
// - Array methods - 
// Subclass instances inherit from Array.
//
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