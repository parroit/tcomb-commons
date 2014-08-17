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
