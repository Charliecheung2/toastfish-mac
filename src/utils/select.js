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
  updateWord(wordRank) {
    const command =
      "UPDATE " +
      this.TABLE_NAME +
      " SET status = 1 WHERE wordRank = " +
      wordRank;
    this.db.exec(command);
  }

  //更新背过的单词的纪录
  updateCount() {
    let countList = [];
    this.db.all("select * from Count", (e, rows) => {
      countList = rows;
      countList.forEach((book) => {
        if (book.bookName === this.TABLE_NAME) {
          const count = book.current + 1;
          console.log(this.TABLE_NAME);
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
    });
  }

  //获取当前词书和背单词数
  getBookNameAndNumber() {
    let global = [];
    this.db.all("select * from Global", (e, rows) => {
      global = rows;
      this.TABLE_NAME = global[0].currentBookName;
      this.WORD_NUMBER = global[0].currentWordNumber;
    });
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
    return new Promise((resolve, reject) => {
      this.db.all("select * from Count", (e, rows) => {
        if (e) reject(e);
        let result = rows.map((book) => {
          return { current: book.current, number: book.number };
        });
        resolve(result);
      });
    });
  }

  //选择某本词书，默认CET4
  selectWordList(TABLE_NAME = "CET4_1") {
    return new Promise((resolve, reject) => {
      this.db.all("select * from " + TABLE_NAME, (err, rows) => {
        if (err) resolve(err);
        this.allWordList = rows;
        resolve(true);
      });
    });
  }

  //随机选择number个单词
  async getRandomWordList(number) {
    await this.selectWordList();
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
    return Promise.resolve(result);
  }

  //随机获取两个单词，作为错误答案
  async getRandomWords(number) {
    let result = [];
    await this.selectWordList();

    for (let i = 0; i < number; i++) {
      let index = Math.floor(Math.random() * this.allWordList.length);
      result.push(this.allWordList.splice(index, 1));
    }
    return Promise.resolve(result);
  }

  //获取日语单词书的所有单词
  selectJpWordList() {
    this.db.all("select * from " + this.TABLE_NAME, (e, rows) => {
      this.allWordList = rows;
    });
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
    let allKanaList = this.db.all("select * from ", this.TABLE_NAME);
    return allKanaList;
  }

  getKanaProgress() {
    let countList = this.db.all("select * from count where bookName = 'Goin'");
    return countList[0], current;
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
