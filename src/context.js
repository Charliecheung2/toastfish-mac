import React, { useContext, useState, useEffect } from "react";

const Context = React.createContext();

const ContextProvider = ({ children }) => {
  const [count, setCount] = useState(null);
  const [book, setBook] = useState("CET4_1");
  const [selectDb, setSelectDb] = useState(window.database.selectDb);
  const [wordList, setWordList] = useState([]);

  useEffect(() => {
    selectDb.getBookNameAndNumber();
    let iniCount = selectDb.WORD_NUMBER;
    setCount(iniCount);
  }, [selectDb]);

  console.log("context-database", window.database);

  const handleCount = (value) => {
    setCount(value);
  };

  const createWordList = (count) => {
    let list = selectDb.getRandomWordList(count);
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
