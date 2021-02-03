const db = require('../db');

function getTestFind() {
  return db
    .getDB('db')
    .collection('test')
    .find()
    .toArray();
}

function getTestFindOne(action) {
  return db
    .getDB('db')
    .collection('test')
    .findOne({ action });
}

module.exports = {
  getTestFind,
  getTestFindOne
};
