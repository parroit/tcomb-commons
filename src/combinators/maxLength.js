/**
    ### maxLength(maxLength, [T=Str], [name])

    ```javascript
    var Zip = maxLength(4);
    ```
**/
function maxLength(maxLength, T, name) {
  return addMetaProps(
    subtype(T || Str, function (x) { return x.length <= maxLength; }, name), 
    {maxLength: maxLength}
  );
} 
