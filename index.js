const mongoose = require('mongoose');
const http = require('http');
const util = require('util');

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const expressWinston = require('express-winston');
const helmet = require('helmet');
const winstonInstance = require('./config/winston');
const { publicRoutes, privateRoutes } = require('./routes/index');
const error = require('./config/errors');
const auth = require('./policies/auth.policy');
const { env } = require('./config/env');
const setWebSocket = require('./middlewares/setWebSocket');

const app = express();

const server = http.createServer(app);

const webSocket = require('./config/socket').init(server);

require('./events/ChatHandler');

// secure apps by setting various HTTP headers
app.use(helmet());
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

// parse body params and attach them to res.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compress());
app.use(methodOverride());

// enable detailed API logging in dev env
//comment this code to reduce api logs
if (env === 'development') {
  app.use(logger('dev'));
  expressWinston.responseWhitelist.push('body');
  app.use(
    expressWinston.logger({
      winstonInstance,
      meta: false, // optional: log meta data about request (defaults to true)
      msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
      colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
    })
  );
}

// set web socket on all app routes
app.all('/api/v1/*', (req, res, next) => setWebSocket(req, res, next, webSocket));

// secure your private routes with jwt authentication middleware
app.all('/api/v1/private/*', (req, res, next) => auth(req, res, next));

// fill routes for express application
app.use('/api/v1/public', publicRoutes);
app.use('/api/v1/private', privateRoutes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

if (env !== 'test') {
  app.use(
    expressWinston.errorLogger({
      winstonInstance
    })
  );
}

// error handler, send stacktrace only during development
app.use(error.handler);

module.exports = app;

// config should be imported before importing any other file
const config = require('./config/env');

const debug = require('debug')('hi-chat:index');

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

// connect to mongo db
const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, {
  keepAlive: 1,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

// print mongoose logs in dev env
if (config.mongooseDebug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

//opens a port if the environment is not test
if (process.env.NODE_ENV !== 'test') {
  // listen on port config.port
  server.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
  });
}
