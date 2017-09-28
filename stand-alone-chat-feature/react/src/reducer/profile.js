import validator from '../lib/reducerValidation.js'
let preReqs = ['type', 'bio', 'genre']

module.exports = (state=null, action) => {
  let {type, payload} = action;

  switch(type) {
    case 'PROFILE_CREATE':
      return payload;
    case 'PROFILE_UPDATE':
      return payload;
    case 'PROFILE_DELETE':
      return null;
    default:
      return state;
  }
}
