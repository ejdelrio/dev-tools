'use strict';

const debug = require('debug')(`${process.env.APP_NAME}: Socket Convo Router`);

const recursiveAsync = require('../lib/recursive-async.js');

const ConvoHub = require('../model/chat-model/convo-hub.js');
const ConvoNode = require('../model/chat-model/convo-node.js');
const Message = require('../model/chat-model/message.js');

module.exports = (userSocket, serverSocket) => {

  userSocket.on('typing', convoData => {
    debug('Typing Socket Event');

    let {convoID, userName} = convoData;
    serverSocket.sockets.emit(`convoTyping-${convoID}`, `${userName} is typing`);
  });


  userSocket.on('newConvo', convoData => {
    debug('newConvo Socket Event');

    let {members, message} = convoData;
    let newConvo = new ConvoHub({members: members});
    message.convoID = newConvo._id;
    newConvo.messages.push(message);

    let newNodes = members.map(member => {
      return new ConvoNode({
        profileID: member._id,
        convoHubID: newConvo._id,
        unread: 0
      });
    });

    newConvo.nodes = newNodes;
    recursiveAsync([newConvo, ...newNodes], function(model) {
      return model.save();
    })
    .then(() => {
      userSocket.emit('sendMessage', message);
    });
  });

  userSocket.on('readNode', node => {
    debug('readNode Socket Emission');

    ConvoNode.findByIdAndUpdate(node._id, {unread: 0}, {new: true})
    .then(node => {
      userSocket.emit('updateUnread', node);
    });
  });

};
