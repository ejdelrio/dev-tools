'use strict';

/*
This is the functionality for auto complete. It creates a tree where each node is the character of a word.
A library of values must be passed into the tree to populate the nodes.
*/
const TriadTree = function() {
  this.alphaHash = {};
};

TriadTree.prototype.loadLibrary = function(library) {
  //Takes an array of values to populate the tree
  if (!Array.isArray(library)) return console.log('Input Must be An Array');
  library.forEach(entry => {
    this.loadWord(entry);
  });
};

TriadTree.prototype.loadWord = function(word) {
  //Takes a word and forms a chain of nodes where the last node in the chain has a
  //wordEnd value of true.
  if (!word) return console.log('No word passed');
  if (word.length === 0) return console.log('passed an empty string');
  if (!this.alphaHash[word[0]]) this.alphaHash[word[0]] = new alphaNode(word[0]);

  const _loadWordCharacters = (node, word, ind) => {
    let char = word[ind];

    if (!word[ind + 1] && node.children[char]) return node.children[char].wordEnd = true;
    if (node.children[char]) return _loadWordCharacters(node.children[char], word, ind + 1);

    node.children[char] = new alphaNode(char);
    if (!word[ind + 1]) return node.children[char].wordEnd = true;
    return _loadWordCharacters(node.children[char], word, ind + 1);
  };

  return _loadWordCharacters(this.alphaHash[word[0]], word, 1);
};

TriadTree.prototype.searchWords = function(word) {
  if (!word) return console.log('No Word Passed!!');
  if (word.length === 0) return console.log('Cannot Pass Emoty String');

  let firstNode = this.alphaHash[word[0]];
  if (!firstNode) return [];

  return this._recursiveWordSearch(firstNode, word, '', 0, []);
};


TriadTree.prototype._recursiveWordSearch = function(node, word, buildingWord, ind, output) {
  /*Recursive function that traverses a tree and adds every value to an empty String
  If the current node has a wordEnd value of true, the current version of the buildingWord
  is pushed to the output array which is returned in the end.*/
  buildingWord += node.value;
  let nextChar = word[ind + 1];

  if (nextChar && node.children[nextChar]) {
    let newNode = node.children[word[ind + 1]];
    return this._recursiveWordSearch(newNode, word, buildingWord, ind + 1, output);
  }

  node.wordEnd ? output.push(buildingWord) : null;
  if (Object.keys(node.children).length === 0) return output;

  for (let child in node.children) {
    this._recursiveWordSearch(node.children[child], word, buildingWord, ind + 1, output);
  }
  return output;
};

const alphaNode = function(char, wordEnd=false) {
  this.value = char;
  this.wordEnd = wordEnd;
  this.children = {};
};

module.exports = TriadTree;
