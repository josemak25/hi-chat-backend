const SocketIO = require('socket.io');

let socket;

exports.getCachedSocket = () => socket;

exports.init = function(server) {
  socket = SocketIO(server);
  return socket;
};
