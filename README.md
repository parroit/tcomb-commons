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

## Combinators

### minLength(minLength, [T=Str], [name])
  
```javascript
var Password = minLength(8);
```

### maxLength(maxLength, [T=Str], [name])
  
```javascript
var Zip = maxLength(4);
```

### min(min, [T=Num], [name])
  
```javascript
var Celsius = min(−273.15);
```

### minExcluded(minExcluded, [T=Num], [name])
  
```javascript
var Positive = minExcluded(0);
```

### max(max, [T=Num], [name])
  
```javascript
var Minute = max(60);
```

### maxExcluded(maxExcluded, [T=Num], [name])
  
```javascript
var Negative = maxExcluded(0);
```

### regexp(re, [T=Str], [name])
  
```javascript
var Numeric = regexp(/^-?[0-9]+$/);
```

### between(opts, [T=Num], [name])
  
```javascript
var Percentage = between({min: 0, max: 100});
```

either(A, B, [name])
  
```javascript
var T = either(Str, Num, 'T');
var t = T({left: 'a', right: null}); // => $T{left: 'a', right: null}
t.isLeft(); // => true
```

## Types

### Strings
  
- Email
- Alpha
- Alphanumeric
- Numeric
- UUID3
- UUID4
- UUID5
- UUID

### Numbers
  
- Int
- Positive
- PositiveInt
- Negative
- NegativeInt
- Percentage

## Functions