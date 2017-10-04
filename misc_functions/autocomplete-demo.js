const TriadTree = require('./triadAutoComplete.js');
const musicGenreLibrary = require('./musicGenreLibrary.js');

let genreAutoComplete = new TriadTree();

genreAutoComplete.loadLibrary(musicGenreLibrary);
