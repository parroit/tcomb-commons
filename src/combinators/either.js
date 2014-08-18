/**
    either(A, B, [name])

    ```javascript
    var T = either(Str, Num, 'T');
    var t = T({left: 'a', right: null}); // => $T{left: 'a', right: null}
    t.isLeft(); // => true
    ```      
**/

function either(A, B, name) {

  name = name || format('Either(%s, %s)', getName(A), getName(B));

  var Struct = struct({
    left: maybe(A),
    right: maybe(B)
  }, '$' + name);

  Struct.prototype.isLeft = function() {
    return Nil.is(this.right);
  };

  var Either = subtype(Struct, alternativeProps('left', 'right'), name);

  return Either;
}