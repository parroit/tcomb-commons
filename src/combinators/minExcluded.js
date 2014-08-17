/**
    ### minExcluded(minExcluded, [Type=Num], [name])

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
