/**
    # tcomb-commons

    A database of types, combinators and functions built with and for [tcomb](https://github.com/gcanti/tcomb) (work in progress)

    **Work in progress**

    ## Tests

    Run `mocha` in the project root.

    ## Attributions

    Used regexps from: [https://github.com/chriso/validator.js](https://github.com/chriso/validator.js)

    ## Contribution

    If you do have a contribution for the package feel free to put up a Pull Request or open an Issue.

    ## License (MIT)

**/
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['t'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('tcomb'));
  } else {
    root.tc = factory(root.t);
  }
}(this, function (t) {

  "use strict";

  var Nil = t.Nil;
  var Str = t.Str;
  var Num = t.Num;
  var struct = t.struct;
  var subtype = t.subtype;
  var mixin = t.mixin;
  var maybe = t.maybe;
  var tuple = t.tuple;
  var format = t.format;
  var getName = t.getName;

  // rigger includes (https://github.com/buildjs/rigger)
  // to view the full library code check out build/tcomb-commons.js

  function alternativeProps(p1, p2) {
    return function (x) {
      return Nil.is(x[p1]) !== Nil.is(x[p2]);
    }
  }

  function concurrentProps(p1, p2) {
    return function (x) {
      return Nil.is(x[p1]) === Nil.is(x[p2]);
    }
  }

  //= combinators/index.js

  //= types/index.js

  //= functions/index.js

  return {
    between: between,
    max: max,
    maxExcluded: maxExcluded,
    maxLength: maxLength,
    min: min,
    minExcluded: minExcluded,
    minLength: minLength,
    regexp: regexp,
    either: either,

    Email: Email,
    Alpha: Alpha,
    Alphanumeric: Alphanumeric,
    Numeric: Numeric,
    UUID3: UUID3,
    UUID4: UUID4,
    UUID5: UUID5,
    UUID: UUID,

    Int: Int,
    Positive: Positive,
    PositiveInt: PositiveInt,
    Negative: Negative,
    NegativeInt: NegativeInt,
    Percentage: Percentage,

    toPropTypes: toPropTypes,
    validate: validate

  };

}));