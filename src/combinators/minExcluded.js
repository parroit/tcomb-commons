/**
    ### minExcluded(minExcluded, [T=Num], [name])

    ```javascript
    var Positive = minExcluded(0);
    ```
**/
function minExcluded(minExcluded, T, name) {
  return addMetaProps(
    subtype(T || Num, function (x) { return x > minExcluded; }, name), 
    {minExcluded: minExcluded}
  );
} 
