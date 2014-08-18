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
