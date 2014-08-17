/**
    ### between(opts, [Type=Num], [name])

    ```javascript
    var Percentage = between({min: 0, max: 100});
    ```
**/
function between(opts, Type, name) {
  return addMetaProps(
    subtype(Type || Num, function (x) { return x >= opts.min && x <= opts.max; }, name), 
    {between: opts}
  );
}
