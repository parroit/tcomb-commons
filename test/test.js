"use strict";
var assert = require('assert');
var tt = require('../tcomb-types');

//
// setup
//

var ok = function (x) { assert.strictEqual(true, x); };
var ko = function (x) { assert.strictEqual(false, x); };
var throws = assert.throws;
var doesNotThrow = assert.doesNotThrow;

//
// strings
//

describe('Email', function() {
  var T = tt.Email; 
  it('should accept valid emails', function() {
      ok(T.is('giulio.canti@gmail.com'));
  });
  it('should reject invalid emails', function() {
      ko(T.is('a'));
  });
});

describe('Alpha', function() {
  var T = tt.Alpha; 
  it('should accept alpha', function() {
      ok(T.is('a'));
  });
  it('should reject non alpha', function() {
      ko(T.is('1'));
      ko(T.is('@'));
  });
});

describe('Alphanumeric', function() {
  var T = tt.Alphanumeric; 
  it('should accept alphanumeric', function() {
      ok(T.is('a'));
      ok(T.is('1'));
  });
  it('should reject non alphanumeric', function() {
      ko(T.is('@'));
  });
});

describe('Numeric', function() {
  var T = tt.Numeric; 
  it('should accept numeric', function() {
      ok(T.is('1'));
  });
  it('should reject non numeric', function() {
      ko(T.is('a'));
      ko(T.is('@'));
  });
});

describe('UUID', function() {
  var T = tt.UUID; 
  it('should accept uuids', function() {
      ok(T.is('73a00360-22bc-11e4-8c21-0800200c9a66'));
  });
  it('should reject non uuids', function() {
      ko(T.is('a'));
  });
});

//
// numbers
//

describe('Int', function() {
  var T = tt.Int; 
  it('should accept integers', function() {
      ok(T.is(0));
      ok(T.is(1));
      ok(T.is(-1));
  });
  it('should reject non integers', function() {
      ko(T.is(1.1));
  });
});

describe('Positive', function() {
  var T = tt.Positive; 
  it('should accept positive numbers', function() {
      ok(T.is(1));
  });
  it('should reject negative numbers', function() {
      ko(T.is(0));
      ko(T.is(-1));
  });
});

describe('Negative', function() {
  var T = tt.Negative; 
  it('should accept negative numbers', function() {
      ok(T.is(-1));
  });
  it('should reject positive numbers', function() {
      ko(T.is(0));
      ko(T.is(1));
  });
});

describe('PositiveInt', function() {
  var T = tt.PositiveInt; 
  it('should accept positive int numbers', function() {
      ok(T.is(1));
  });
  it('should reject non positive int numbers', function() {
      ko(T.is(0));
      ko(T.is(-1));
      ko(T.is(1.1));
  });
});

describe('NegativeInt', function() {
  var T = tt.NegativeInt; 
  it('should accept negative int numbers', function() {
      ok(T.is(-1));
  });
  it('should reject non negative int numbers', function() {
      ko(T.is(1));
      ko(T.is(0));
      ko(T.is(-1.1));
  });
});

describe('Percentage', function() {
  var T = tt.Percentage; 
  it('should accept percentages', function() {
      ok(T.is(0));
      ok(T.is(50));
      ok(T.is(20.5));
      ok(T.is(100));
  });
  it('should reject non percentages', function() {
      ko(T.is(-1));
      ko(T.is(101));
  });
});