# tcomb-types

A database of types and combinators written with [tcomb](https://github.com/gcanti/tcomb)

**Work in progress**

## Combinators

### regexp(re, [Type=Str], [name])

```javascript
var Numeric = regexp(/^-?[0-9]+$/);
```

### minLength(minLength, [Type=Str], [name])

```javascript
var Password = minLength(8);
```

### maxLength(maxLength, [Type=Str], [name])

```javascript
var Zip = maxLength(4);
```

### min(min, [Type=Num], [name])

```javascript
var Celsius = min(−273.15);
```

### minExcluded(minExcluded, [Type=Num], [name])

```javascript
var Positive = minExcluded(0);
```

### max(max, [Type=Num], [name])

```javascript
var Minute = max(60);

```

### maxExcluded(maxExcluded, [Type=Num], [name])

```javascript
var Negative = maxExcluded(0);
```

### between(opts, [Type=Num], [name])

```javascript
var Percentage = between({min: 0, max: 100});
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


## Tests

Run `mocha` in the project root.

## Attributions

Used regexps from: [https://github.com/chriso/validator.js](https://github.com/chriso/validator.js)

## Contribution

If you do have a contribution for the package feel free to put up a Pull Request or open an Issue.

## License (MIT)

    The MIT License (MIT)

    Copyright (c) 2014 Giulio Canti

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
