const TriadTree = require('../misc_functions/triadAutoComplete.js');
const musicGenreLibrary = require('./musicGenreLibrary.js');

let genreAutoComplete = new TriadTree();

genreAutoComplete.loadLibrary(musicGenreLibrary);
console.log(genreAutoComplete.searchWords('bel'));

module.exports = genreAutoComplete;
