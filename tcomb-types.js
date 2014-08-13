//     https://github.com/gcanti/tcomb-types
//     (c) 2014 Giulio Canti
//     tcomb-types.js may be freely distributed under the MIT license.

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['t'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('tcomb'));
  } else {
    root.tt = factory(root.t);
  }
}(this, function (t) {

  "use strict";

  var Str = t.Str;
  var Num = t.Num;
  var subtype = t.subtype;
  var mixin = t.mixin;

  function addMetaProps(Type, props) {
    mixin(Type.meta, props);
    return Type;
  }

  //
  // combinator utils
  //

  function regexp(re, name) {
    return addMetaProps(
      subtype(Str, function (s) { return re.test(s); }, name), 
      {re: re}
    );
  }

  function minLength(minLength, Type, name) {
    return addMetaProps(
      subtype(Type, function (x) { return x.length >= minLength; }, name), 
      {minLength: minLength}
    );
  } 

  function maxLength(maxLength, Type, name) {
    return addMetaProps(
      subtype(Type, function (x) { return x.length <= maxLength; }, name), 
      {maxLength: maxLength}
    );
  } 

  function min(min, Type, name) {
    return addMetaProps(
      subtype(Type, function (x) { return x >= min; }, name), 
      {min: min}
    );
  } 

  function minExcluded(minExcluded, Type, name) {
    return addMetaProps(
      subtype(Type, function (x) { return x > minExcluded; }, name), 
      {minExcluded: minExcluded}
    );
  } 

  function max(max, Type, name) {
    return addMetaProps(
      subtype(Type, function (x) { return x <= max; }, name), 
      {max: max}
    );
  }

  function maxExcluded(maxExcluded, Type, name) {
    return addMetaProps(
      subtype(Type, function (x) { return x < maxExcluded; }, name), 
      {maxExcluded: maxExcluded}
    );
  }

  function between(min, max, Type, name) {
    return addMetaProps(
      subtype(Type, function (x) { return x >= min && x <= max; }, name), 
      {min: min, max: max}
    );
  }

  //
  // strings
  //

  // regexps from
  // https://github.com/chriso/validator.js

  var email = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
  var alpha = /^[a-zA-Z]+$/;
  var alphanumeric = /^[a-zA-Z0-9]+$/;
  var numeric = /^-?[0-9]+$/;
  var uuid = {
    '3': /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
    '4': /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    '5': /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
  };

  var Email = regexp(email, 'Email');
  var Alpha = regexp(alpha, 'Alpha');
  var Alphanumeric = regexp(alphanumeric, 'Alphanumeric');
  var Numeric = regexp(numeric, 'Numeric');
  var UUID3 = regexp(uuid['3'], 'UUID3');
  var UUID4 = regexp(uuid['4'], 'UUID4');
  var UUID5 = regexp(uuid['5'], 'UUID5');
  var UUID = regexp(uuid.all, 'UUID');

  //
  // numbers
  //

  var Int = subtype(Num, function (x) {
    return x === parseInt(x, 10);
  }, 'Int');
  var Positive = min(0, Num, 'Positive');
  var PositiveInt = min(0, Int, 'PositiveInt');
  var Negative = maxExcluded(0, Num, 'Negative');
  var NegativeInt = maxExcluded(0, Int, 'NegativeInt');

  // export tcomb
  return mixin({
    
    addMetaProps: addMetaProps,

    // combinators
    regexp: regexp,
    minLength: minLength,
    maxLength: maxLength,
    min: min,
    minExcluded: minExcluded,
    max: max,
    maxExcluded: maxExcluded,
    between: between,
    
    // strings
    Email: Email,
    Alpha: Alpha,
    Alphanumeric: Alphanumeric,
    Numeric: Numeric,
    UUID3: UUID3,
    UUID4: UUID4,
    UUID5: UUID5,
    UUID: UUID,
    
    // numbers
    Int: Int,
    Positive: Positive,
    PositiveInt: PositiveInt,
    Negative: Negative,
    NegativeInt: NegativeInt
  
  }, t);

}));