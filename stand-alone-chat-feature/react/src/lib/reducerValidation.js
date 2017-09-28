module.exports = (payload, preReqs) => {
  let incomplete = false;
  /* Instructions:
  -Create an array with string values of all the parameters your payload must have.
  -At the beginning of each case, pass the payload and the globally defined array.
   */
  for (let i = 0; i < preReqs.length; i++) {
    if(!payload[preReqs[i]]) {
      console.error(`VALIDATION ERROR: Missing ${preReqs[i]} property.`);
      incomplete = true;
    }
  }

  if(incomplete) throw new Error('VALIDATION ERROR: process terminated.');
};
