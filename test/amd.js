"use strict";

var assert = require("assert"),
    fs     = require("fs");

describe("AMD module", function(){

  it('loads as an AMD module', function(){

    function define(browsersugar) {
      assert.equal(typeof browsersugar.mix, "function", ["There is no 'mix' function"]);
    }

    eval(fs.readFileSync("./dist/browsersugar.min.js", {"encoding":"utf8"}));
  });

});
