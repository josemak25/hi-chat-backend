const SocketIO = require('../config/socket');
// const saveChatToDB = require('')

const socket = SocketIO.getCachedSocket();

const ChatHandler = socket => {
  // setup event listener
  socket.on('connection', () => {
    console.log('started successfully');

    // notification for user coming online
    socket.on('login notification', ({ user }) => {
      console.log(`${user.name} is online`);
      socket.emit('user online notification', { user });
    });

    // user is typing on a chat
    socket.on('typing', ({ user, message }) => {
      socket.emit('notifyTyping', { user, message });
    });

    // when user stops typing on a chat
    socket.on('stopTyping', () => {
      socket.emit('notifyStopTyping');
    });

    // new message on user chat
    socket.on('chat message', ({ message, sender }) => {
      console.log(`message from user chat: ${message}`);

      // broadcast message to one-one chat partner.
      socket.emit('message received', { message });

      // save chat to the database
      saveChatToDB({ message, sender });
    });

    // user offline notification
    socket.on('disconnect', () => {
      socket.emit('user disconnected');
    });
  });
};

module.exports = ChatHandler(socket);
