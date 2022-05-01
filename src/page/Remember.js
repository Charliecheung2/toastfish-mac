import React, { useState } from "react";
import { useMyContext } from "../context";
import Choice from "./Choice";

const Remember = () => {
  const { count, selectDb, wordList, handleWordList } = useMyContext();
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState(false);

  const handleClick = (tooEasy, wordRank = null) => {
    if (tooEasy) {
      selectDb.updateWord(wordRank, 1);
      handleWordList(wordRank);
    }
    if (index === count - 1) {
      setStatus(true);
      return;
    }
    setIndex(index + 1);
  };

  return (
    <div>
      {status ? (
        <Choice />
      ) : (
        <>
          <div className="info">
            <div className="word-container">
              <span>{wordList[index].headWord}</span>
              <span>{`[${wordList[index].usphone}]`}</span>
            </div>
            <div className="tranCN">{wordList[index].tranCN}</div>
            <div className="phrase-container">
              <div className="phrase">{wordList[index].phrase}</div>
              <div className="phraseCN">{wordList[index].phraseCN}</div>
            </div>
          </div>
          <div className="options-container">
            <button className="option-btn" onClick={() => handleClick(false)}>
              记住了
            </button>
            <button
              className="option-btn"
              onClick={() => handleClick(true, wordList[index].wordRank)}
            >
              太简单
            </button>
            <button className="pronounce" onClick={handleClick}>
              发音
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Remember;
