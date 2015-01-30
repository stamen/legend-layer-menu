"use strict";

var assert = require("assert"),
    fs     = require("fs");

describe("AMD module", function(){

  it('loads as an AMD module', function(){

    function define(context) {
      assert.equal(typeof arguments[1]({},{},{}).mix, "function", ["There is no 'mix' function"]);
    }

    eval(fs.readFileSync("./dist/samesies.min.js", {"encoding":"utf8"}));
  });

});
