'use strict';

const TriadTree = function() {
  this.alphaHash = {};
};

TriadTree.prototype.loadLibrary = function(library) {
  if (!Array.isArray(library)) return console.log('Input Must be An Array');
  library.forEach(entry => {
    this.loadWord(entry);
  });
};

TriadTree.prototype.loadWord = function(word) {
  if (!word) return console.log('No word passed');
  if (word.length === 0) return console.log('passed an empty string');
  if (!this.alphaHash[word[0]]) this.alphaHash[word[0]] = new alphaNode(word[0]);


  const _loadWordCharacters = (node, word, ind) => {
    let char = word[ind];

    if (node.children[char]) {
      if (!word[ind + 1]) return node.children[char].wordEnd = true;
      let child = node.children[char];
      return _loadWordCharacters(child, word, ind + 1);
    }

    node.children[char] = new alphaNode(char);
    if (!word[ind + 1]) return node.children[char].wordEnd = true;
    return _loadWordCharacters(node.children[char], word, ind + 1);
  };


  return _loadWordCharacters(this.alphaHash[word[0]], word, 1);
};



TriadTree.prototype.searchWords = function(word) {
  if (!word) return console.log('No Word Passed!!');
  if (word.length === 0) return console.log('Cannot Pass Emoty String');

  let output = [];
  let firstNode = this.alphaHash[word[0]];
  if (!firstNode) return output;

  const _recursiveWordSearch = (node, word, buildingWord, ind) => {
    if (node.value) buildingWord += node.value;
    let nextChar = word[ind + 1];
    
    if (nextChar && node.children[nextChar]) {
      let newNode = node.children[word[ind + 1]];
      return _recursiveWordSearch(newNode, word, buildingWord, ind + 1);
    }
    if (node.wordEnd) output.push(buildingWord);
    if (!node.children) return output;

    for (let child in node.children) {
      _recursiveWordSearch(node.children[child], word, buildingWord, ind + 1);
    }
    return output;
  };
  return _recursiveWordSearch(firstNode, word, '', 0);
};


const alphaNode = function(char, wordEnd=false) {
  this.value = char;
  this.wordEnd = wordEnd;
  this.children = {};
};

module.exports = TriadTree;
