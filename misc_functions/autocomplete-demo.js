const TriadTree = require('../misc_functions/triadAutoComplete.js');
const musicGenreLibrary = require('./musicGenreLibrary.js');

let genreAutoComplete = new TriadTree();

genreAutoComplete.loadLibrary(musicGenreLibrary);
module.exports = genreAutoComplete.searchWords;
