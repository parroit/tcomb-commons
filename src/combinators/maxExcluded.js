/**
    ### maxExcluded(maxExcluded, [T=Num], [name])

    ```javascript
    var Negative = maxExcluded(0);
    ```
**/
function maxExcluded(maxExcluded, T, name) {
  return addMetaProps(
    subtype(T || Num, function (x) { return x < maxExcluded; }, name), 
    {maxExcluded: maxExcluded}
  );
}
