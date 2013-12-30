var vows = require('vows'),
    assert = require('assert');

var readonly = require('../lib/index.js');
var UnableRewriteException = require('../lib/UnableRewriteException.js');
var _ = require('underscore');

vows.describe('ReadOnly function').addBatch({
    'Restrict rewrite': {
        topic: function() {
            var obj = {'A':'a', 'B':'b', 'C':'c'};
            return obj;
        },

        'Writable from module A': function (topic) {
            var moduleA = {};
            moduleA.obj = topic;
            moduleA.obj.A = 'd';
            assert.equal(moduleA.obj.A, 'd');
        },

        'Not writable from module B': function (topic) {
            var moduleB = {};
            moduleB.obj = readonly(topic);
            assert.throws(function() { moduleB.obj.B = 'b'; }, UnableRewriteException);
        },
    },

    'Update and rewrite': {
        topic: function() {
            var obj = {'A':'a', 'B':'b', 'C':'c'};
            return obj;
        },
        
        'can rewrite from A and access from B': function (topic) {
            var moduleA = {};
            var moduleB = {};
            moduleA.obj = topic;
            moduleB.obj = readonly(topic);
            moduleA.obj.A = 'd';

            assert.equal(moduleB.obj.A, 'd');
        }
    },

    'Reference of _original': {
        topic: function() {
            var obj = {'A':'a', 'B':'b', 'C':'c'};
            return obj;
        },
        'cannot refer _original': function(topic) {
            var moduleB = {};
            moduleB.obj = readonly(topic);
        }
    },
    
    'Extends test': {
        topic: function() {
            var obj = {'A':'a', 'B':'b', 'C':'c'};
            return obj;
        },
        
        'can copy': function(obj) {
            var obj2 = _.clone(obj);
            obj2.A = 'd';
            assert.equal(obj.A, 'a');
        }
    },

    'Getter Test': {
        topic: function() {
            var obj = {'A':'a', 'B':'b', 'C':'c'};
            var cloned = {};

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

            for (var prop in obj) {
                makeReadOnlyProperty(cloned, obj, prop);
            }
            
            /*
            function makeGetter(prop) {
                return function() {
                    var p = prop;
                    return obj[p];
                };
            }

            var _cloned = {};
            for (var prop in obj) {
                var getter = makeGetter(prop);
                Object.defineProperty(_cloned, prop, {
                    set: function() {
                        throw new UnableRewriteException('original cannot be rewrite');
                    },
                    get: function() {
                        return obj[prop]
                    },
                    enumerable: true
                });
                _cloned[prop];
            }
            */
            return cloned;
        },

        'get a': function(obj) {
            assert.equal(obj.A, 'a');
        }
    }

           
}).export(module); // Export the Suite