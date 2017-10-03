'use strict';

/*
This is the functionality for auto complete. It creates a tree where each node is the character of a word.
A library of values must be passed into the tree to populate the nodes.
*/
const TriadTree = function() {
  this.alphaHash = {};
};

TriadTree.prototype.loadLibrary = function(library) {
  // Takes an array of values to populate the tree
  if (!Array.isArray(library)) return console.log('Input Must be An Array');
  library.forEach(entry => {
    this.loadWord(entry);
  });
};

TriadTree.prototype.loadWord = function(word) {
  // Takes a word and forms a chain of nodes where the last node in the chain has a
  // wordEnd value of true.
  if (!word) return console.log('No word passed');
  if (typeof word !== 'string') return console.log('Input must be a string');
  if (!this.alphaHash[word[0]]) this.alphaHash[word[0]] = new alphaNode(word[0]);

  const _loadWordCharacters = (node, word, ind) => {
    let char = word[ind];

    if (node.children[char]) {
      return !word[ind + 1] ?
      node.children[char].wordEnd = true:
      _loadWordCharacters(node.children[char], word, ind + 1);
    }

    node.children[char] = new alphaNode(char);

    return !word[ind + 1] ?
    node.children[char].wordEnd = true:
    _loadWordCharacters(node.children[char], word, ind + 1);
  };

  return _loadWordCharacters(this.alphaHash[word[0]], word, 1);
};


TriadTree.prototype.searchWords = function(word) {
  if (!word) return console.log('No Word Passed!!');
  if (typeof word !== 'string') return console.log('Input must be a string');

  let firstNode = this.alphaHash[word[0]];
  var output = [];
  if (!firstNode) return [];

  function _wordSearch(node, autoWord, ind) {
    autoWord += node.value;
    let nextChar = word[ind + 1];
    let {children} = node;

    if (nextChar && children[nextChar]) return _wordSearch(children[nextChar], autoWord, ind + 1);

    node.wordEnd ? output.push(autoWord) : null;
    if (Object.keys(node.children).length === 0) return output;

    for (let child in node.children) {
      _wordSearch(node.children[child], autoWord, ind + 1);
    }
    return output;
  }

  return _wordSearch(firstNode, '', 0);
};


const alphaNode = function(char, wordEnd=false) {
  this.value = char;
  this.wordEnd = wordEnd;
  this.children = {};
};


module.exports = TriadTree;
