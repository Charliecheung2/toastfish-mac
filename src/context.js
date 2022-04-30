import React, { useContext, useState } from "react";

const Context = React.createContext();

const ContextProvider = ({ children }) => {
  const [count, setCount] = useState(10);
  const [book, setBook] = useState("CET4_1");
  const [selectDb, setSelectDb] = useState(null);
  const [wordList, setWordList] = useState([]);

  const handleCount = (value) => {
    setCount(value);
  };

  const createWordList = (count) => {
    let db = new window.database.Select(book, count);
    setSelectDb(db);
    let list = db.getRandomWordList(count);
    setWordList(list);
  };

  //更改单词状态为1
  const handleWordList = (wordRank) => {
    let newList = wordList.map((word) => {
      if (word.wordRank === wordRank) {
        word.status = 1;
      }
      return word;
    });
    setWordList(newList);
  };

  return (
    <Context.Provider
      value={{
        count,
        selectDb,
        wordList,
        handleCount,
        handleWordList,
        createWordList,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useMyContext = () => useContext(Context);
export { ContextProvider, useMyContext };
