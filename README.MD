# hi-chat express-rest-api-backend

> Hi-chat Express REST API with JWT Authentication mongoose and mongodb

- authentication via [JWT](https://jwt.io/)
- routes mapping via [express-routes-mapper](https://github.com/aichbauer/express-routes-mapper)
- database [mongodb](https://www.mongodb.com/)
- environments for `development`, `testing`, and `production`
- linting via [eslint](https://github.com/eslint/eslint)
- integration tests running with [Jest](https://github.com/facebook/jest)
- built with [npm scripts](#npm-scripts)
- example for User model and User controller, with jwt authentication, simply type `yarn` and `yarn start`

## Table of Contents

- [Install & Use](#install-and-use)
- [Folder Structure](#folder-structure)
- [Api](#api)
  - [Controllers](#controllers)
    - [Create a Controller](#create-a-controller)
    - [Models](#models)
      - [Create a Model](#create-a-model)
  - [Policies](#policies)
    - [auth.policy](#authpolicy)
  - [Services](#services)
- [Config](#config)
  - [Connection and Database](#connection-and-database)
- [Routes](#routes)
  - [Create Routes](#create-routes)
- [Test](#test)
  - [Setup](#setup)
- [npm Scripts](#npm-scripts)

## Install and Use

Start by cloning this repository

```sh
# HTTPS
$ git clone https://github.com/joefazee/real-estate.git
```

then

```sh
# cd into project root
# install all dependencipes
$ yarn
# if you use npm run
$ npm install
# start the api
$ yarn start
$ npm start
```

sqlite is supported out of the box as it is the default.

## Folder Structure

This boilerplate has 4 main directories:

- api - for controllers, models, services, etc.
- config - for database, etc.
- helpers - this is only a dir for all utility/helper functions.
- routes - this is for routes
- test - using [Jest](https://github.com/facebook/jest)

## Controllers

### Create a Controller

Controllers in this boilerplate have a naming convention: `ModelnameController.js` and uses an object factory pattern.
To use a model inside of your controller you have to require it.
We use [Mongoose](https://mongoosejs.com/) as ODM, if you want further information read the [Docs](https://mongoosejs.com/docs/).

Example Controller for all **CRUD** oparations:

```js
const Model = require('../models/Model');

const ModelController = () => {
  const create = async (req, res) => {
    // body is part of a form-data
    const { value } = req.body;

    try {
      const model = await Model.create({
        key: value
      });

      if(!model) {
        return res.status(400).json({ msg: 'Bad Request: Model not found' });
      }

      return res.status(200).json({ model });
    } catch (err) {
      // better save it to log file
      console.error(err);

      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getAll = async (req, res) => {
    try {
      const model = await Model.findAll();

      if(!models){
        return res.status(400).json({ msg: 'Bad Request: Models not found' });
      }

      return res.status(200).json({ models });
    } catch (err) {
      // better save it to log file
      console.error(err);

      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const get = async (req, res) => {
    // params is part of an url
    const { id } = req.params;

    try {
      const model = await Model.findOne({
        where: {
          id,
        },
      });

      if(!model) {
        return res.status(400).json({ msg: 'Bad Request: Model not found' });
      }

      return res.status(200).json({ model });
    } catch (err) {
      // better save it to log file
      console.error(err);

      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const update = async (req, res) => {
    // params is part of an url
    const { id } = req.params;

    // body is part of form-data
    const { value } = req.body;

    try {
      const model = await Model.findById(id);

      if(!model) {
        return res.status(400).json({ msg: 'Bad Request: Model not found' });
      }

      const updatedModel = await model.update({
        key: value,
      )};

      return res.status(200).json({ updatedModel });
    } catch (err) {
      // better save it to log file
      console.error(err);

      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const destroy = async (req, res) => {
    // params is part of an url
    const { id } = req.params;

    try {
      const model =  Model.findById(id);

      if(!model) {
        return res.status(400).json({ msg: 'Bad Request: Model not found' })
      }

      await model.destroy();

      return res.status(200).json({ msg: 'Successfully destroyed model' });
    } catch (err) {
      // better save it to log file
      console.error(err);

      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  // IMPORTANT
  // don't forget to return the functions
  return {
    create,
    getAll,
    get,
    update,
    destroy,
  };
};

model.exports = ModelController;
```

## Models

### Create a Model

Models in this boilerplate have a naming convention: `Model.js` and uses [Mongoose](https://mongoosejs.com/) to define our Models, if you want further information read the [Docs](https://mongoosejs.com/docs/).

Example User Model:

```js
const { Schema, model } = require('mongoose');

// for encrypting our passwords
const bcryptSevice = require('../services/bcrypt.service');

// the actual model
const schema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 150,
      required: true
    },
    email: {
      type: String,
      index: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 5,
      maxlength: 150,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

// instead of using instanceMethod
// in mongoose ˆ5 we are writing the function
// to the prototype object of our model.
// as we do not want to share sensitive data, the password
// field gets ommited before sending
schema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

// IMPORTANT
// don't forget to export the Model
module.exports = model('user', schema);

// hooks are functions that can run before or after a specific event
schema.post('save', user => {
  user.password = bcryptService().hashPassword(user);
});
```

## Policies

Middlewares are functions that can run before hitting a apecific or more specified route(s).

Example isAdmin:

Only allow if the user is marked as admin.

> Note: this is not a secure example, only for presentation puposes

```js
const httpStatus = require('http-status');
const sendResponse = require('../../helpers/response');

module.exports = (req, res, next) => {
  const { isAdmin } = req.token;

  if (!isAdmin) {
    return res.json(
      sendResponse(
        httpStatus.UNAUTHORIZED,
        'You are not Authorized to perform this operation!',
        null
      )
    );
  }

  next();
};
```

To use this middleware on all routes that only admins are allowed:

api.js

```js
const isAdmin = require('../api/middlewares/isAdmin');

app.all('/admin/*', (req, res, next) => isAdmin(req, res, next));
```

Or for one specific route

api.js

```js
const isAdmin = require('../api/middlewares/isAdmin');

const privateRoutes = {
  'GET /users': {
    path: 'UserController.getAll',
    middlewares: [isAdmin]
  }
};

module.exports = privateRoutes;
```

## auth.policy

The `auth.policy` checks wether a `JSON Web Token` ([further information](https://jwt.io/)) is send in the header of an request as `Authorization: Bearer [JSON Web Token]` or inside of the body of an request as `token: [JSON Web Token]`.
The policy runs default on all api routes that are are prefixed with `/private`. To map multiple routes read the [docs](https://github.com/aichbauer/express-routes-mapper/blob/master/README.md) from `express-routes-mapper`.

To use this policy on all routes of a specific prefix:

app.js

````js
const auth = require('./policies/auth.policy');

// secure your private routes with jwt authentication middleware
app.all('/api/v1/private/*', (req, res, next) => auth(req, res, next));```

or to use this policy on one specific route:

app.js

```js
app.get('/specificRoute',
  (req, res, next) => auth(req, res, next),
  (req, res) => {
  // do some fancy stuff
});
````

## Services

Services are little useful snippets, or calls to another API that are not the main focus of your API.

Example service:

Get user password hashed on signup or compare user passowrd on login:

```js
require('dotenv').config();
const bcrypt = require('bcrypt');

const bcryptService = () => {
  const hashPassword = ({ password }) => {
    const salt = bcrypt.genSaltSync(Number(process.env.HASHING_SALT));
    return bcrypt.hashSync(password, salt);
  };

  const comparePassword = (pw, hash) => bcrypt.compareSync(pw, hash);

  return {
    hashPassword,
    comparePassword
  };
};

module.exports = bcryptService;
```

## Config

Holds all the server configurations.

## Connection and Database

> Note: as for this project we using mongodb so make sure mongodb server is running on the machine

This two files are the way to establish a connaction to a database.

You only need to touch env.js, default for `development`

> Note: to connect to a mongodb running database run these package with: `yarn` or `npm install` and start the app with `yarn start` or `npm start`

Now simple configure the keys with your credentials.

```js
// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET,
  jwtExpirationInterval: envVars.JWT_EXPIRATION_INTERVAL,
  mongo: {
    host: process.env.NODE_ENV === 'development' ? envVars.MONGO_HOST : envVars.MONGO_HOST_TEST,
    port: envVars.MONGO_PORT
  },
  clientSideUrl: envVars.CLIENT_SIDE_URL,
  circa_email: envVars.CIRCA_DEV_EMAIL
};

module.exports = config;
```

To not configure the production code.

To start the DB, add the credentials for production. add `environment variables` by adding your configs to the .env files e.g. check the .env-example file for more understanding read the [docs](https://github.com/dotenv/dotenv/README.md) from `dotenv`. before starting the api.

## Routes

Here you define all your routes for your api. It doesn't matter how you structure them. By default they are mapped on `privateRoutes` and `publicRoutes`. You can define as much routes files as you want e.g. for every model or for specific use cases, e.g. normal user and admins.

## Create Routes

For further information read the [docs](https://github.com/aichbauer/express-routes-mapper/blob/master/README.md) of express-routes-mapper.

Example for User Model:

> Note: Only supported Methods are **POST**, **GET**, **PUT**, and **DELETE**.

userRoutes.js

```js
const userRoutes = {
  'POST /user': 'UserController.create',
  'GET /users': 'UserController.getAll',
  'GET /user/:id': 'UserController.get',
  'PUT /user/:id': 'UserController.update',
  'DELETE /user/': 'UserController.destroy'
};

module.exports = userRoutes;
```

To use these routes in your application, require them in the config/index.js and export them.

```js
const userRoutes = require('./userRoutes');

const config = {
  allTheOtherStuff,
  userRoutes
};

module.exports = config;
```

api.js

```js
const mappedUserRoutes = mapRoutes(config.userRoutes, 'api/controllers/');

app.use('/prefix', mappedUserRoutes);

// to protect them with authentication
app.all('/prefix/*', (req, res, next) => auth(req, res, next));
```

## Test

All test for this boilerplate uses [Jest](https://github.com/facebook/jest) and [supertest](https://github.com/visionmedia/superagent) for integration testing. So read their docs on further information.

### Setup

The setup directory holds the `_setup.js` which holds `beforeAction` which starts a test express application and connects to your test database, and a `afterAction` which closes the db connection.

### Controller

> Note: those request are asynchronous, we use `async await` syntax.

> Note: As we don't use import statements inside the api we also use the require syntax for tests

To test a Controller we create `fake requests` to our api routes.

Example `GET /user` from last example with prefix `prefix`:

```js
const request = require('supertest');
const { beforeAction, afterAction } = require('../setup/_setup');

let api;

beforeAll(async () => {
  api = await beforeAction();
});

afterAll(() => {
  afterAction();
});

test('test', async () => {
  const token = 'this-should-be-a-valid-token';

  const res = await request(api)
    .get('/prefix/user')
    .set('Accept', /json/)
    // if auth is needed
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .expect(200);

  // read the docs of jest for further information
  expect(res.body.user).toBe('something');
});
```

### Models

Are usually automatically tested in the integration tests as the Controller uses the Models, but you can test them separatly.

## npm scripts

There are no automation tool or task runner like [grunt](https://gruntjs.com/) or [gulp](http://gulpjs.com/) used for this boilerplate. These boilerplate only uses npm scripts for automatization.

### npm start

This is the entry for a developer. This command:

By default it uses a sqlite databse, if you want to migrate the sqlite db by each start, disable the `prestart` and `poststart` command. Also mind if you are using a sqlite database to delete the `drop-sqlite-db` in the prepush hook.

- runs **nodemon watch task** for the all files conected to `.api/api.js`
- sets the **environment variable** `NODE_ENV` to `development`
- opens the db connection for `development`
- starts the server on 127.0.0.1:2017

### npm test

This command:

- runs `npm run lint` ([eslint](http://eslint.org/)) with the [airbnb styleguide](https://github.com/airbnb/javascript) without arrow-parens rule for **better readability**
- sets the **environment variable** `NODE_ENV` to `testing`
- creates the `database.sqlite` for the test
- runs `jest --coverage` for testing with [Jest](https://github.com/facebook/jest) and the coverage
- drops the `database.sqlite` after the test

## npm run production

This command:

- sets the **environment variable** to `production`
- opens the db connection for `production`
- starts the server on 127.0.0.1:2017 or on 127.0.0.1:PORT_ENV

Before running on production you have to set the **environment vaiables**:

- DB_NAME - database name for production
- DB_USER - database username for production
- DB_PASS - database password for production
- DB_HOST - database host for production
- JWT_SECERT - secret for json web token

Optional:

- PORT - the port your api on 127.0.0.1, default to 2017

### other commands

- `npm run dev` - simply start the server withou a watcher
- `npm run create-sqlite-db` - creates the sqlite database
- `npm run drop-sqlite-db` - drops **ONLY** the sqlite database
- `npm run lint` - linting with [eslint](http://eslint.org/)
- `npm run nodemon` - same as `npm start``
- `npm run prepush` - a hook wich runs before pushing to a repository, runs `npm test` and `npm run dropDB`
- `pretest` - runs linting before `npm test`
- `test-ci` - only runs tests, nothing in pretest, nothing in post test, for better use with ci tools

## LICENSE

MIT © Hi-chat
