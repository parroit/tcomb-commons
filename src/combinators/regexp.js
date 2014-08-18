/**
    ### regexp(re, [T=Str], [name])

    ```javascript
    var Numeric = regexp(/^-?[0-9]+$/);
    ```
**/
function regexp(re, Type, name) {
  return addMetaProps(
    subtype(Type || Str, function (s) { return re.test(s); }, name), 
    {regexp: re}
  );
}
