/**
    # tcomb-commons

    A database of types and combinators written with [tcomb](https://github.com/gcanti/tcomb)

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

  var Str = t.Str;
  var Num = t.Num;
  var subtype = t.subtype;
  var mixin = t.mixin;
  var maybe = t.maybe;
  var tuple = t.tuple;
  var Nil = t.Nil;

  // rigger includes (https://github.com/buildjs/rigger)
  // to view the full library code check out build/tcomb.js

  //= utils.js

  //= combinators/_rig

  //= types/_rig

  //= functions/_rig

  return {
    between: between,
    max: max,
    maxExcluded: maxExcluded,
    maxLength: maxLength,
    min: min,
    minExcluded: minExcluded,
    minLength: minLength,
    regexp: regexp,

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