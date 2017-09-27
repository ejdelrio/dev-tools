'use strict';

require('dotenv').config();
const debug = require('debug')(`${process.env.APP_NAME}: Socket Router`);
const socketio = require('socketio');
const messageSocket = require('./message-router.js');
const convoSocket = require('./convo=router.js');


module.exports = server => {

  const serverSocket = socketio(server);
  serverSocket.on('connect' socket => {

    console.log('__SOCKET_CONNECTED__', socket.id);
    messageSocket(socket, serverSocket);
    convoSocket(socket, serverSocket);

  }
};
