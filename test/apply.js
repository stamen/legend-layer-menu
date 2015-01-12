"use strict";

var assert = require("assert");

describe("events", function(){

  var samesies = require("../index.js");

  it('mixes functions into an object', function(){
    assert.equal(typeof samesies.mix({}).on, "function", ["There is no 'on' function"]);
  });

  function Constr() {

    return this;
  }

  it('extends an existing function', function(){
    assert.equal(typeof (new (samesies.extend(Constr))()).on, "function", ["There is no 'on' function"]);
  });

});
