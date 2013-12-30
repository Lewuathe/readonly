readonly [![Build Status](https://travis-ci.org/Lewuathe/readonly.png?branch=master)](https://travis-ci.org/Lewuathe/readonly)
========

**readonly** is simple reference restriction library between custom modules in node object.

## How to install

    npm install readonly

## How to use

```js
var readonly = require('readonly');

var obj = {'A':'a','B':'b','C':'c'};

// Normal ACL. You can use `obj` through moduleA as you like
var moduleA = {};
moduleA.obj = obj;

// Readonly restriction of `obj` in moduleB
var moduleB = {};
moduleB.obj = readonly(obj);

// You can update `obj` from moduleA
moduleA.obj.A = "d";
// This updates can be seen from moduleB
console.log(moduleB.obj.A); // --> "d"

// But if you update `obj` through moduleB, it will throws `UnableRewriteException`
moduleA.obj.B = "e";  // --> UnableRewriteException: original cannot be rewrite
```

## LICENSE

MIT License. Please see the LICENSE file for details.

