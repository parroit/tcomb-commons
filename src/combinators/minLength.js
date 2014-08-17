/**
    ### minLength(minLength, [Type=Str], [name])

    ```javascript
    var Password = minLength(8);
    ```
**/
function minLength(minLength, Type, name) {
  return addMetaProps(
    subtype(Type || Str, function (x) { return x.length >= minLength; }, name), 
    {minLength: minLength}
  );
} 
