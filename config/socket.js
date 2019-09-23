const http = require('http');
const express = require('express');
const SocketIO = require('socket.io');
const app = express();
const server = http.createServer(app);

const socket = SocketIO(server);

const setWebSocket = require('../middlewares/setWebSocket');

app.all('/api/v1/*', (req, res, next) => setWebSocket(req, res, next, socket));

const getCachedSocket = () => socket;

module.exports = { app, server, getCachedSocket };

require('../app');
require('../events/ChatHandler');
