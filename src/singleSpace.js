const _ = require('lodash');

function SingleSpace(namespace, cb) {
    // create a unique, global symbol name
    // -----------------------------------

    const moduleInstanceKey = Symbol.for(namespace);

    // check if the global object has this symbol
    // add it if it does not have the symbol, yet
    // ------------------------------------------

    const globalSymbols = Object.getOwnPropertySymbols(global);

    if (_.isFunction(cb)) {
        const hasInstance = (globalSymbols.indexOf(moduleInstanceKey) > -1);

        if (!hasInstance) {
            global[moduleInstanceKey] = cb();
        }
    }

    // define the singleton API
    // ------------------------

    const singleton = {};

    Object.defineProperty(singleton, 'instance', {
        get: () => {
            return global[moduleInstanceKey];
        }
    });

    // ensure the API is never changed
    // -------------------------------

    Object.freeze(singleton);

    // export the singleton API only
    // -----------------------------

    // export default singleton.instance;

    return singleton.instance;
}

module.exports = SingleSpace;
