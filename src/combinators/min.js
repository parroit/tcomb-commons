/**
    ### min(min, [Type=Num], [name])

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
