const path = require("path");
var sqlite3 = require("sqlite3").verbose();

var db = null;

const connect = () => {
  db = new sqlite3.Database(path.resolve(__dirname, "../assets/db/inami.db"));
  return db;
};

const close = (db) => {
  db.close();
};

module.exports = {
  close,
  connect,
};
