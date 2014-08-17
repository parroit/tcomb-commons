/**
    ### maxLength(maxLength, [Type=Str], [name])

    ```javascript
    var Zip = maxLength(4);
    ```
**/
function maxLength(maxLength, Type, name) {
  return addMetaProps(
    subtype(Type || Str, function (x) { return x.length <= maxLength; }, name), 
    {maxLength: maxLength}
  );
} 
