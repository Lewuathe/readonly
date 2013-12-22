/**
 *  Module dependencies
 */

var util = require('util');

function UnableRewriteException(message) {
    var self = this;
    self.message = message;
    self.name = 'UnableRewriteException';
}

module.exports = UnableRewriteException;