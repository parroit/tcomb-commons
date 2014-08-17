function addMetaProps(Type, props) {
  mixin(Type.meta, props);
  return Type;
}
