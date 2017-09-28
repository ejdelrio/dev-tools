'use strict';

require('dotenv').config();
const debug = require('debug')(`${process.env.APP_NAME}: Socket Message Router`);
const createError = require('http-errors');

const recursiveAsync = require('../lib/recursive-async.js');

const ConvoHub = require('../model/chat-model/convo-hub.js');
const ConvoNode = require('../model/chat-model/convo-node.js');
const Message = require('../model/chat-model/message.js');
const Profile = require('../model/profile.js');


module.exports = (userSocket, serverSocket) => {

  userSocket.on('newMessage', message => {
    debug('newMessage Socket Emmision');

    var hub, allNodes;

    ConvoHub.findById(message.convoID)
    .populate('convoNode')
    .then(convoHub => {
      convoHub.messages.push(message);
      hub = convoHub;
      return hub.nodes;
    })

    .then(nodes => {
      allNodes = nodes.map(node => {
        node.messages.push(message);
        if(node.profileID !== message.authorID) node.unread += 1;
        return node;
      });
    })

    .then(() => {
      recursiveAsync([hub, ...allNodes], function(model) {
        return model.save();
      });
    })

    .then(() => {
      allNodes.forEach(node => {
        serverSocket.sockets.emit(`updateNodes-${node.profileID}`, message);
      });
    })

    .catch(err => createError(400, err));
  });
};
