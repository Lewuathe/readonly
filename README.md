readonly
========

Simple reference restriction library between custome module in node object.

## How to install

    npm install 

## How to use

    var readonly = require('readonly');

	var obj = {'A':'a','B':'b','C':'c'};

	// Normal ACL. You can use `obj` through moduleA as you like
	var moduleA = {};
	moduleA.obj = obj;

	// Readonly restriction of `obj` in moduleB
	var moduleB = {};
	moduleB.obj = readonly(obj);

	moduleA.obj.A = "d";

	console.log(moduleB.obj.A);

## LICENSE

MIT License. Please see the LICENSE file for details.

