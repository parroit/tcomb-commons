/**
    ### max(max, [T=Num], [name])

    ```javascript
    var Minute = max(60);
    ```
**/
function max(max, T, name) {
  return addMetaProps(
    subtype(T || Num, function (x) { return x <= max; }, name), 
    {max: max}
  );
}
