const _ = require('lodash');

function SingleSpace(namespace, cb) {
    // Must be a non empty string
    if (!_.isString(namespace) || namespace.length <= 0) {
        throw new Error('Namespace parameter must be a string with 1 or more characters.');
    }

    // create a unique, global symbol name
    const moduleInstanceKey = Symbol.for(namespace);

    // check if the global object has this symbol
    // add it if it does not have the symbol, yet
    const globalSymbols = Object.getOwnPropertySymbols(global);

    if (_.isFunction(cb)) {
        const hasInstance = (globalSymbols.indexOf(moduleInstanceKey) > -1);

        if (!hasInstance) {
            const value = cb();

            if (_.isNil(value)) {
                // If null or undefined is returned then do not define the namespace.
                return;
            }

            global[moduleInstanceKey] = cb();
        }
    } else if (!_.isNil(cb)) {
        // If provided the callback must be a function
        throw new Error('Callback must be a function');
    }

    // define the singleton API
    const singleton = {};

    Object.defineProperty(singleton, 'instance', {
        get: () => {
            return global[moduleInstanceKey];
        }
    });

    // ensure the API is never changed
    Object.freeze(singleton);

    // export the singleton instance only
    return singleton.instance;
}

module.exports = SingleSpace;
