import React from "react";

const GoinRemember = ({ wordList, index, handleClick }) => {
  return (
    <>
      <div className="info">
        <div className="goin-container">
          <div className="hiragana">{`平假名：[${wordList[index].hiragana}]`}</div>
          <div className="katakana">{`片假名：[${wordList[index].katakana}]`}</div>
          <div className="romaji">{`罗马音：[${wordList[index].romaji}]`}</div>
        </div>
        <div className="options-container">
          <button
            className="option-btn"
            onClick={() => handleClick(false)}
            id="option-1"
          >
            记住了
          </button>
          <button className="option-btn" onClick={handleClick} id="option-2">
            发音
          </button>
        </div>
      </div>
    </>
  );
};

export default GoinRemember;
