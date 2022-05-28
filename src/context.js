import React, { useContext, useState, useEffect } from "react";

const Context = React.createContext();

const ContextProvider = ({ children }) => {
  const [count, setCount] = useState(null);
  const [selectDb, setSelectDb] = useState(window.database.selectDb);
  const [wordList, setWordList] = useState([]);

  useEffect(() => {
    selectDb.getBookNameAndNumber();
    // 更改默认背词数
    let iniCount = selectDb.WORD_NUMBER;
    setCount(iniCount);
  }, [selectDb]);

  const handleCount = (value) => {
    setCount(value);
  };

  const createWordList = (count) => {
    selectDb.getBookNameAndNumber();
    let list = selectDb.getRandomWordList(count, selectDb.TABLE_NAME);
    setWordList(list);
  };

  //更改本地单词状态为1（未写入数据库）
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
