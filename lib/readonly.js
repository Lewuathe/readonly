/**
 * Module dependencies.
 */
var util = require('util');
var _ = require('underscore');
var UnableRewriteException = require('./UnableRewriteException');

function readonly(target, keys) {
    var _cloned = {};

    function makeGetter(prop) {
        return function() {
            var p = prop;
            console.log("---------" + p);
            return target[p];
        };
    }

/*
    Object.defineProperty(_cloned, '_original', {
        set: function() {
            throw new UnableRewriteException('original cannot be rewrite');
        },
        get: function() {
            return target;
        },
    });
*/

    var getters = {};

    for (var prop in target) {
        var getter = makeGetter(prop);
        Object.defineProperty(_cloned, prop, {
            set: function() {
                throw new UnableRewriteException('original cannot be rewrite');
            },
            get: function() {
                console.log("GETTER " + prop);
                return getter();
            },
            enumerable: true
        });
        _cloned[prop];
    }

    return _cloned;
    
}
                          

module.exports = readonly;
