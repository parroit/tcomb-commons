/**
    ### max(max, [Type=Num], [name])

    ```javascript
    var Minute = max(60);
    ```
**/
function max(max, Type, name) {
  return addMetaProps(
    subtype(Type || Num, function (x) { return x <= max; }, name), 
    {max: max}
  );
}
