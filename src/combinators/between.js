/**
    ### between(opts, [T=Num], [name])

    ```javascript
    var Percentage = between({min: 0, max: 100});
    ```
**/
function between(opts, T, name) {
  return addMetaProps(
    subtype(T || Num, function (x) { return x >= opts.min && x <= opts.max; }, name), 
    {between: opts}
  );
}
