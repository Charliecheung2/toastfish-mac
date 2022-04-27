const Select = require("../select");

it("创建数据库", () => {
  let db = new Select("CET4_1", 10);
  expect(db.TABLE_NAME).toEqual("CET4_1");
  expect(db.WORD_NUMBER).toEqual(10);
  db = null;
  db = new Select("CET6_1", 30);
  expect(db.TABLE_NAME).toEqual("CET6_1");
  expect(db.WORD_NUMBER).toEqual(30);
});

it("标记单词为背过", () => {
  let db = new Select("CET4_1", 10);
  db.updateWord(100, 1);
  let word = db.getWordByRank(100);
  expect(word.status).toEqual(1);
  // db.updateWord(100, 0);
  // word = db.getWordByRank(100);
  // expect(word.status).toEqual(0);
});
