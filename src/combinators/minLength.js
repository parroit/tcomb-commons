/**
    ### minLength(minLength, [T=Str], [name])

    ```javascript
    var Password = minLength(8);
    ```
**/
function minLength(minLength, T, name) {
  return addMetaProps(
    subtype(T || Str, function (x) { return x.length >= minLength; }, name), 
    {minLength: minLength}
  );
} 
