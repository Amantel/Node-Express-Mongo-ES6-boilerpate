
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

const async = require('async');
const serverSettings = require('./server_settings');


const state = {
  db: null,
};


const options = {
  keepAlive: 1,
  connectTimeoutMS: 30000,
  poolSize: 300,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const client = new MongoClient(serverSettings.databaseConnectionURL, options); // app

exports.connect = function connect(done) {
  Object.keys(state).forEach((key) => {
    if (state[key]) return done();
  });

  async.series([
    function cc(callback) {
      client.connect((err, db) => {
        if (err) return callback(err);
        state.db = db.db(serverSettings.appDB);
        return callback(null);
      });
    },
  ], (err) => {
    if (err) return done(err);
    return done();
  });
};

exports._id = function _id(id) {
  if (mongodb.ObjectID.isValid(id)) {
    return new ObjectID(id);
  }
  return null;
};


exports.getDB = function getDB(dbName) {
  return state[dbName];
};

exports.close = function close(done) {
  Object.keys(state).forEach((key) => {
    if (state[key]) {
      state.db.close((err) => {
        state.db = null;
        state.mode = null;
        done(err);
      });
    }
  });
};
