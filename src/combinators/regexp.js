/**
    ### regexp(re, [T=Str], [name])

    ```javascript
    var Numeric = regexp(/^-?[0-9]+$/);
    ```
**/
function regexp(re, T, name) {
  return addMetaProps(
    subtype(T || Str, function (s) { return re.test(s); }, name), 
    {regexp: re}
  );
}
