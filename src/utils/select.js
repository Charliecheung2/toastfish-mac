const db = require("./db");

class DateBase {
  constructor(TABLE_NAME, WORD_NUMBER) {
    this.TABLE_NAME = TABLE_NAME;
    this.WORD_NUMBER = WORD_NUMBER;
    this.db = db.connect();
    this.allWordList = null;
    this.allJpWordList = null;
  }

  //标记单词已背过
  updateWord(wordRank, status) {
    // console.log(
    //   "UPDATE " +
    //     this.TABLE_NAME +
    //     " SET status = " +
    //     status +
    //     " WHERE wordRank = " +
    //     wordRank
    // );
    const command =
      "UPDATE " +
      this.TABLE_NAME +
      " SET status = " +
      status +
      " WHERE wordRank = " +
      wordRank;
    this.db.exec(command);
  }

  getWordByRank(rank) {
    let word = this.db
      .prepare("select * from CET4_1 where wordRank = " + rank)
      .all();
    return word[0];
  }

  //更新背过的单词的纪录
  updateCount() {
    let countList = this.db.prepare("select * from Count").all();
    countList.forEach((book) => {
      if (book.bookName === this.TABLE_NAME) {
        const count = book.current + 1;
        if (book.bookName === "Goin") {
          count %= 104;
        } // TODO:这里余104待办
        const command =
          "UPDATE Count SET current = " +
          count +
          " WHERE bookName = '" +
          this.TABLE_NAME +
          "'";
        this.db.exec(command);
      }
    });
  }

  //获取当前词书和背单词数
  getBookNameAndNumber() {
    let global = this.db.prepare("select * from Global").all();
    // console.log(global);
    this.TABLE_NAME = global[0].currentBookName;
    this.WORD_NUMBER = global[0].currentWordNumber;
  }

  //更改词书名字
  updateBookName(tableName) {
    const command = "UPDATE Global SET currentBookName = '" + tableName + "'";
    this.db.exec(command);
  }

  //更改词书数量
  updateNumber(number) {
    const command = "UPDATE Global SET currentWordNumber = " + number;
    this.db.exec(command);
  }

  //查询当前单词表的当前进度
  selectCount() {
    let result = [];
    result = this.db.prepare("select * from Count").all();
    result = result.map((book) => {
      return { current: book.current, number: book.number };
    });
    return result;
  }

  //选择某本词书，默认CET4
  selectWordList(TABLE_NAME = "CET4_1") {
    this.allWordList = this.db.prepare("select * from " + TABLE_NAME).all();
  }

  //随机选择number个单词
  getRandomWordList(number) {
    this.selectWordList();
    let wordList = [];
    let result = [];

    let [...allWordArray] = this.allWordList;

    allWordArray.forEach((word) => {
      if (word.status === 0) {
        wordList.push(word);
      }
    });

    if (wordList.length === 0) {
      return [];
    } else if (wordList.length < Number) {
      number = wordList.length;
    }

    for (let i = 0; i < number; i++) {
      let index = Math.floor(Math.random() * allWordArray.length);
      result.push(allWordArray[index]); // TODO:这里可优化
      allWordArray.splice(index, 1);
    }
    return result;
  }

  //随机获取两个单词，作为错误答案
  getRandomWords(number) {
    let result = [];
    this.selectWordList();

    for (let i = 0; i < number; i++) {
      let index = Math.floor(Math.random() * this.allWordList.length);
      result.push(this.allWordList.splice(index, 1)[0]);
    }
    return result;
  }

  //获取日语单词书的所有单词
  selectJpWordList() {
    this.allJpWordList = this.db
      .prepare("select * from " + this.TABLE_NAME)
      .all();
  }

  //从日语中随机选择number个单词
  getRandomJpWordList(number) {
    let result = [];
    this.selectJpWordList();
    let [...allJpWordArray] = this.allJpWordList;

    let wordList = [];
    allJpWordArray.forEach((word) => {
      if (word.status === 0) {
        wordList.push(word);
      }
    });

    if (wordList.length === 0) {
      return result;
    } else if (wordList.length < number) {
      number = wordList.length;
    }

    for (let i = 0; i < number; i++) {
      let index = Math.floor(Math.random() * allJpWordArray.length);
      result.push(allJpWordArray.slice(index, 1));
    }

    return result;
  }

  getRandomJpWords(number) {
    let result = [];
    this.selectJpWordList();
    let [...allWordArray] = this.allJpWordList;

    for (let i = 0; i < number; i++) {
      let index = Math.floor(Math.random() * allWordArray.length);
      result.push(allWordArray.slice(index, 1));
    }
    return result;
  }

  getKanaList() {
    let allKanaList = this.db.prepare("select * from ", this.TABLE_NAME).all();
    return allKanaList;
  }

  getKanaProgress() {
    let countList = this.db
      .prepare("select * from count where bookName = 'Goin'")
      .all();
    return countList[0].current;
  }

  getTwoKanaRandomWords(currentWord) {
    let result = [];
    let wordList = this.getKanaList();
    for (let i = 0; i < 2; i++) {
      let index = Math.floor(Math.random() * wordList.length);
      if (currentWord.wordRank === index + 1) {
        i--;
        continue;
      }
      result.push(wordList.slice(index, 1));
    }
    return result;
  }
}

module.exports = DateBase;
