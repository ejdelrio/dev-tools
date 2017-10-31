'use strict';

/*
This is the functionality for auto complete. It creates a tree where each node is the character of a word.
A library of values must be passed into the tree to populate the nodes.
*/
const TrieTree = function() {
  this.alphaHash = {};
};

TrieTree.prototype.loadWord = function(obj, stringVal) {
  // Takes a word and forms a chain of nodes where the last node in the chain has a
  // wordEnd value of true.
  if (!obj) return console.error('No object passed');
  if(!stringVal) return console.error('No string value passed');
  if(typeof stringVal != 'string') return console.error('Second input must be a string');
  
  if (!this.alphaHash[stringVal[0]]) this.alphaHash[stringVal[0]] = new alphaNode(stringVal[0]);

  const _loadWordCharacters = (node, ind) => {
    let char = stringVal[ind];

    if (node.children[char]) {
      return !stringVal[ind + 1] ?
      node.children[char].wordEnd = obj:
      _loadWordCharacters(node.children[char], ind + 1);
    }

    node.children[char] = new alphaNode(char);

    return !stringVal[ind + 1] ?
    node.children[char].wordEnd = obj:
    _loadWordCharacters(node.children[char], ind + 1);
  };

  return _loadWordCharacters(this.alphaHash[stringVal[0]], 1);
};


TrieTree.prototype.searchWords = function(word) {
  if (!word) return console.error('No Word Passed!!');
  if (typeof word !== 'string') return console.error('Input must be a string');
  if (!this.alphaHash[word[0]]) return [];
  let output = [];

  function _wordSearch(node, ind) {
    let nextChar = word[ind + 1];
    let {children} = node;
    let numberOfChildren = Object.keys(children).length;

    if (nextChar && !children[nextChar]) return output;
    if (children[nextChar]) return _wordSearch(children[nextChar], ind + 1);
    if (node.wordEnd) output.push(node.wordEnd);
    if (numberOfChildren === 0) return output;

    for (let child in children) {
      _wordSearch(children[child], ind + 1);
    }
    return output;
  }

  return _wordSearch(this.alphaHash[word[0]], 0);
};
