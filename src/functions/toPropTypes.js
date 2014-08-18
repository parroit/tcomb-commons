
function toPropTypes(Struct) {
  var ret = {};
  var props = Struct.meta.props;
  for (var k in props) {
    if (props.hasOwnProperty(k)) {
      ret[k] = function (values, name, component) {
        var Type = props[name];
        var value = values[name];
        if (!Type.is(value)) {
          return new Error(format('Invalid prop `%s` of value `%s` supplied to `%s`, expected a %s.', name, value, component, getName(Type)));
        }
      }
    }
  }
  return ret;
}
