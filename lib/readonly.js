/**
 * Module dependencies.
 */
var util = require('util');
var _ = require('underscore');
var UnableRewriteException = require('./UnableRewriteException');

function readonly(target, keys) {
    var _cloned = {};
    function makeReadOnlyProperty(cloned, obj, prop) {
        Object.defineProperty(cloned, prop, {
            set: function() {
                throw new UnableRewriteException('original cannot be rewrite');
            },
            get: function() {
                return obj[prop]
            },
            enumerable: true
        });
    }

    for (var prop in target) {
        makeReadOnlyProperty(_cloned, target, prop);
    }

    return _cloned;
}
                          

module.exports = readonly;
