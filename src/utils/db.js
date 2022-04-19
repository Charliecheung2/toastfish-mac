const path = require("path");
const sqlite3 = require("better-sqlite3");
var db = null;

const connect = () => {
  db = new sqlite3(path.resolve(__dirname, "../assets/db/inami.db"));
  return db;
};

const close = (db) => {
  db.close();
};

module.exports = {
  close,
  connect,
};
