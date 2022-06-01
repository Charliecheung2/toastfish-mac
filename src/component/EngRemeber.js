import React from "react";

const EngRemeber = ({ wordList, index, handleClick }) => {
  return (
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
        <button
          className="option-btn"
          onClick={() => handleClick(false)}
          id="option-1"
        >
          记住了
        </button>
        <button
          className="option-btn"
          onClick={() => handleClick(true, wordList[index].wordRank)}
          id="option-2"
        >
          太简单
        </button>
        <button className="pronounce" onClick={handleClick} id="option-3">
          发音
        </button>
      </div>
    </>
  );
};

export default EngRemeber;
