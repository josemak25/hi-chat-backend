module.exports = (req, res, next, webSocket) => {
  req.webSocket = webSocket;
  next();
};
