/**
    ## Combinators
**/

function addMetaProps(Type, props) {
  mixin(Type.meta, props);
  return Type;
}

//= minLength.js
//= maxLength.js
//= min.js
//= minExcluded.js
//= max.js
//= maxExcluded.js
//= regexp.js
//= between.js
//= either.js