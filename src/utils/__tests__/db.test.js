const db = require("../db");

it("连接数据库", () => {
  const database = db.connect();
  expect(database.open).toEqual(true);
});
