/**
    ### min(min, [T=Num], [name])

    ```javascript
    var Celsius = min(−273.15);
    ```
**/
function min(min, T, name) {
  return addMetaProps(
    subtype(T || Num, function (x) { return x >= min; }, name), 
    {min: min}
  );
} 
