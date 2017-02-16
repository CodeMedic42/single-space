# single-space
A module which provides a simple way for ensuring singleton in node.

[![npm version](https://badge.fury.io/js/single-space.svg)](https://www.npmjs.com/package/single-space)
[![Build Status](https://travis-ci.org/CodeMedic42/single-space.svg?branch=master)](https://travis-ci.org/CodeMedic42/single-space)
[![Coverage Status](https://coveralls.io/repos/github/CodeMedic42/single-space/badge.svg?branch=master)](https://coveralls.io/github/CodeMedic42/single-space?branch=master)


Code taken and modified gently from

https://derickbailey.com/2016/03/09/creating-a-true-singleton-in-node-js-with-es6-symbols/

Thanks to this developer.

Ussage
```js
const SingleSpace = require('single-space.js');

module.exports = SingleSpace('module.my.namespace.example', () => {
    function Example(options) {
        if (!(this instanceof Example)) {
            return new Example(options);
        }

        this.options = options;
    }

    Example.prototype.echo = function echo(sound) {
        return sound;
    }

    return Example;
});
```
