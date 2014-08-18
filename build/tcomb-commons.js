//     tcomb-commons 0.0.1
//     https://github.com/gcanti/tcomb-commons
//     (c) 2014 Giulio Canti <giulio.canti@gmail.com>
//     tcomb-commons may be freely distributed under the MIT license.

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

  /**
      ## Combinators
  **/
  
  function addMetaProps(Type, props) {
    mixin(Type.meta, props);
    return Type;
  }
  
  /**
      ### minLength(minLength, [T=Str], [name])
  
      ```javascript
      var Password = minLength(8);
      ```
  **/
  function minLength(minLength, Type, name) {
    return addMetaProps(
      subtype(Type || Str, function (x) { return x.length >= minLength; }, name), 
      {minLength: minLength}
    );
  }
  /**
      ### maxLength(maxLength, [T=Str], [name])
  
      ```javascript
      var Zip = maxLength(4);
      ```
  **/
  function maxLength(maxLength, Type, name) {
    return addMetaProps(
      subtype(Type || Str, function (x) { return x.length <= maxLength; }, name), 
      {maxLength: maxLength}
    );
  }
  /**
      ### min(min, [T=Num], [name])
  
      ```javascript
      var Celsius = min(−273.15);
      ```
  **/
  function min(min, Type, name) {
    return addMetaProps(
      subtype(Type || Num, function (x) { return x >= min; }, name), 
      {min: min}
    );
  }
  /**
      ### minExcluded(minExcluded, [T=Num], [name])
  
      ```javascript
      var Positive = minExcluded(0);
      ```
  **/
  function minExcluded(minExcluded, Type, name) {
    return addMetaProps(
      subtype(Type || Num, function (x) { return x > minExcluded; }, name), 
      {minExcluded: minExcluded}
    );
  }
  /**
      ### max(max, [T=Num], [name])
  
      ```javascript
      var Minute = max(60);
      ```
  **/
  function max(max, Type, name) {
    return addMetaProps(
      subtype(Type || Num, function (x) { return x <= max; }, name), 
      {max: max}
    );
  }
  /**
      ### maxExcluded(maxExcluded, [T=Num], [name])
  
      ```javascript
      var Negative = maxExcluded(0);
      ```
  **/
  function maxExcluded(maxExcluded, Type, name) {
    return addMetaProps(
      subtype(Type || Num, function (x) { return x < maxExcluded; }, name), 
      {maxExcluded: maxExcluded}
    );
  }
  /**
      ### regexp(re, [T=Str], [name])
  
      ```javascript
      var Numeric = regexp(/^-?[0-9]+$/);
      ```
  **/
  function regexp(re, Type, name) {
    return addMetaProps(
      subtype(Type || Str, function (s) { return re.test(s); }, name), 
      {regexp: re}
    );
  }
  /**
      ### between(opts, [T=Num], [name])
  
      ```javascript
      var Percentage = between({min: 0, max: 100});
      ```
  **/
  function between(opts, Type, name) {
    return addMetaProps(
      subtype(Type || Num, function (x) { return x >= opts.min && x <= opts.max; }, name), 
      {between: opts}
    );
  }
  /**
      either(A, B, [name])
  
      ```javascript
      var T = either(Str, Num, 'T');
      var t = T({left: 'a', right: null}); // => $T{left: 'a', right: null}
      t.isLeft(); // => true
      ```      
  **/
  
  function either(A, B, name) {
  
    name = name || format('Either(%s, %s)', getName(A), getName(B));
  
    var Struct = struct({
      left: maybe(A),
      right: maybe(B)
    }, '$' + name);
  
    Struct.prototype.isLeft = function() {
      return Nil.is(this.right);
    };
  
    var Either = subtype(Struct, alternativeProps('left', 'right'), name);
  
    return Either;
  }

  /**
      ## Types
  **/
  /**
      ### Strings
  
      - Email
      - Alpha
      - Alphanumeric
      - Numeric
      - UUID3
      - UUID4
      - UUID5
      - UUID
  **/
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
  
  var Email = regexp(email, Str, 'Email');
  var Alpha = regexp(alpha, Str, 'Alpha');
  var Alphanumeric = regexp(alphanumeric, Str, 'Alphanumeric');
  var Numeric = regexp(numeric, Str, 'Numeric');
  var UUID3 = regexp(uuid['3'], Str, 'UUID3');
  var UUID4 = regexp(uuid['4'], Str, 'UUID4');
  var UUID5 = regexp(uuid['5'], Str, 'UUID5');
  var UUID = regexp(uuid.all, Str, 'UUID');
  /**
      ### Numbers
  
      - Int
      - Positive
      - PositiveInt
      - Negative
      - NegativeInt
      - Percentage
  **/
  var Int = subtype(Num, function (x) {
    return x === parseInt(x, 10);
  }, 'Int');
  var Positive = minExcluded(0, Num, 'Positive');
  var PositiveInt = minExcluded(0, Int, 'PositiveInt');
  var Negative = maxExcluded(0, Num, 'Negative');
  var NegativeInt = maxExcluded(0, Int, 'NegativeInt');
  var Percentage = between({min: 0, max: 100}, Num, 'Percentage');

  /**
      ## Functions
  **/
  
  function toPropTypes(Struct) {
    var ret = {};
    var props = Struct.meta.props;
    for (var k in props) {
      if (props.hasOwnProperty(k)) {
        ret[k] = function (values, name, component) {
          var Type = props[name];
          var value = values[name];
          if (!Type.is(value)) {
            return new Error(format('Invalid prop `%s` of value `%s` supplied to `%s`, expected a %s.', name, value, component, getName(Type)));
          }
        }
      }
    }
    return ret;
  }
  
  function pushAll(arr, elements) {
    Array.prototype.push.apply(arr, elements);
  }
  
  var ValidationErr = t.struct({
    expected: t.Str,
    actual: t.Any
  });
  
  function validate(T, x) {
    var result = [];
  
    switch (T.meta.kind) {
      case 'primitive' :
      case 'enums' :
      case 'tuple' :
        if (!T.is(x)) {
          result.push(new Error(t.format('%s:%o', t.getName(T), x)));
        }
        break;
      case 'maybe' :
        if (!Nil.is(x)) {
          pushAll(result, validate(T.meta.type, x));
        }
        break;
      default :
        throw new Error('unsupported validation');
    }
  
    return result;
  }

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