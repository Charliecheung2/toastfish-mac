const path = require("path");
const Database = require("better-sqlite3");
var db = null;

const connect = () => {
  db = new Database(path.resolve(__dirname, "../assets/db/inami.db"));
  return db;
};

module.exports = {
  connect,
};
