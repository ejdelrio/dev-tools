'use strict';

module.exports = function(arr, callback) {
  /*Function takes an array of similar data types and performs an asynchronous
  operation on the entire array in a dynamic fashion */
  let counter = 0;

  const _recursiveIterator = item => {
    //Recursive function that applies the async callback to each item of the array
    //Each output is encapsulated in a promise
    return new Promise((resolve, reject) => {
      callback(item)
      .then(output => resolve(output))
      .catch(err => reject(err));
    });
  };

  return _recursiveIterator(arr[counter])
  .then(function helper() {
    /* Second recursive helper that calls the original recursion
    It than calls itself in the then block, incrementing the counter each time*/
    counter += 1;
    if(counter === arr.length) return console.log('all done');

    _recursiveIterator(arr[counter])
    .then(helper)
    .catch(err => console.error(err));
  });
};
