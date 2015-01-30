"use strict";

var assert = require("assert"),
    fs     = require("fs");

describe("AMD module", function(){

  it('loads as an AMD module', function(){

    function define(samesies) {
      assert.equal(typeof samesies.mix, "function", ["There is no 'mix' function"]);
    }

    eval(fs.readFileSync("./dist/samesies.min.js", {"encoding":"utf8"}));
  });

});
