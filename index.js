// import Select from "/src/utils/select";
const Select = require("./src/utils/select.js");

const selectDb = new Select("CET4_1", 20);

//获取当前词书和单词数目
selectDb.getBookNameAndNumber();
console.log(selectDb.TABLE_NAME);
console.log(selectDb.WORD_NUMBER);

//背完一个单词后，加1
selectDb.updateCount();

//更改默认词书？
selectDb.updateBookName("cet-4");
selectDb.updateNumber("30");

//查询进度
selectDb.selectCount().then((res) => {
  console.log(res);
});

//更改词书
selectDb.selectWordList("CET6_1").then(() => {
  console.log(selectDb.allWordList);
});

//随机获取n个单词
selectDb.getRandomWordList(3).then((res) => {
  console.log(res);
});

//随机获取n个单词
selectDb.getRandomWords(2).then((res) => {
  console.log(res);
});
