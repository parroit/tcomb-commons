// work in progress..
function pushAll(arr, elements) {
  Array.prototype.push.apply(arr, elements);
}

var ValidationErr = t.struct({
  expected: t.Str,
  actual: t.Any
});

function validate(T, x) {
  var result = [];

  switch (T.meta.kind) {
    case 'primitive' :
    case 'enums' :
    case 'tuple' :
      if (!T.is(x)) {
        result.push(new Error(t.format('%s:%o', t.getName(T), x)));
      }
      break;
    case 'maybe' :
      if (!Nil.is(x)) {
        pushAll(result, validate(T.meta.type, x));
      }
      break;
    default :
      throw new Error('unsupported validation');
  }

  return result;
}
