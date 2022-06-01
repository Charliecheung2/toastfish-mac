import React, { useState, useEffect } from "react";
import { useMyContext } from "../context";
import Choice from "./Choice";
import { EngRemeber, GoinRemember, JpRemember } from "../component";

const Remember = () => {
  const { count, selectDb, wordList, handleWordList } = useMyContext();
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState(false);
  const [book, setBook] = useState("");

  //注册快捷键
  useEffect(() => {
    function handleKeyPress(event) {
      document.getElementById(`option-${event.key}`).click();
    }
    window.addEventListener("keyup", handleKeyPress, true);

    return () => {
      window.removeEventListener("keyup", handleKeyPress, true);
    };
  }, [index]);

  useEffect(() => {
    selectDb.getBookNameAndNumber();
    setBook(selectDb.TABLE_NAME);
  }, []);

  const handleClick = (tooEasy, wordRank = null) => {
    if (tooEasy) {
      selectDb.updateWord(wordRank, 1);
      selectDb.updateCount();
      handleWordList(wordRank);
    }
    if (index === count - 1) {
      setStatus(true);
      return;
    }
    setIndex(index + 1);
  };

  if (status) {
    return <Choice />;
  }

  return (
    <div>
      {book === "Goin" ? (
        <GoinRemember index={index} wordList={wordList} handleClick={handleClick} />
      ) : book === "StdJp_Mid" ? (
        <JpRemember index={index} wordList={wordList} handleClick={handleClick} />
      ) : (
        <EngRemeber index={index} wordList={wordList} handleClick={handleClick} />
      )}
    </div>
  );
};

export default Remember;
