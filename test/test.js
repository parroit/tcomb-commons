"use strict";
var assert = require('assert');
var t = require('tcomb');
var tc = require('../build/tcomb-commons');

var maybe = t.maybe;
var Str = t.Str;
var Num = t.Num;
var Err = t.Err;
var getName = t.getName;

//
// setup
//

var ok = function (x) { assert.strictEqual(true, x); };
var ko = function (x) { assert.strictEqual(false, x); };
var eq = assert.strictEqual;
var throwsWithMessage = function (f, message) {
  assert['throws'](f, function (err) {
    ok(err instanceof Error);
    eq(err.message, message);
    return true;
  });
};
var doesNotThrow = assert.doesNotThrow;

//
// combinators
//
describe('either', function() {
  it('should have a meaninful default name', function() {
    var T = tc.either(Str, Num); 
    eq(getName(T), 'Either(Str, Num)')
  });
  it('should handle only one branch', function() {
    var T = tc.either(Str, Num);
    throwsWithMessage(function () {
      var t = T({left: null, right: null});
    }, 'bad type value `Either(Str, Num)`');
    throwsWithMessage(function () {
      var t = T({left: 'a', right: 1});
    }, 'bad type value `Either(Str, Num)`');
  });
  it('should have a isLeft method', function() {
    var T = tc.either(Str, Num);
    var t = T({left: 'a', right: null});
    ok(t.isLeft());
  });
});

//
// strings
//

describe('Email', function() {
  var T = tc.Email; 
  it('should accept valid emails', function() {
      ok(T.is('giulio.canti@gmail.com'));
  });
  it('should reject invalid emails', function() {
      ko(T.is('a'));
  });
});

describe('Alpha', function() {
  var T = tc.Alpha; 
  it('should accept alpha', function() {
      ok(T.is('a'));
  });
  it('should reject non alpha', function() {
      ko(T.is('1'));
      ko(T.is('@'));
  });
});

describe('Alphanumeric', function() {
  var T = tc.Alphanumeric; 
  it('should accept alphanumeric', function() {
      ok(T.is('a'));
      ok(T.is('1'));
  });
  it('should reject non alphanumeric', function() {
      ko(T.is('@'));
  });
});

describe('Numeric', function() {
  var T = tc.Numeric; 
  it('should accept numeric', function() {
      ok(T.is('1'));
  });
  it('should reject non numeric', function() {
      ko(T.is('a'));
      ko(T.is('@'));
  });
});

describe('UUID', function() {
  var T = tc.UUID; 
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
  var T = tc.Int; 
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
  var T = tc.Positive; 
  it('should accept positive numbers', function() {
      ok(T.is(1));
  });
  it('should reject negative numbers', function() {
      ko(T.is(0));
      ko(T.is(-1));
  });
});

describe('Negative', function() {
  var T = tc.Negative; 
  it('should accept negative numbers', function() {
      ok(T.is(-1));
  });
  it('should reject positive numbers', function() {
      ko(T.is(0));
      ko(T.is(1));
  });
});

describe('PositiveInt', function() {
  var T = tc.PositiveInt; 
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
  var T = tc.NegativeInt; 
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
  var T = tc.Percentage; 
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

//
// functions
//

describe('validate', function(){
    var validate = tc.validate;

    // primitive
    it('should validate primitive', function() {
      var T = Str;
      ok(validate(T, 'a').length === 0);
      ok(validate(T, 1).length === 1);
    });
    
    // maybe
    it('should validate maybe', function() {
      var T = maybe(Str);
      ok(validate(T, null).length === 0);
      ok(validate(T, 'a').length === 0);
      ok(validate(T, 1).length === 1);
    });
});
