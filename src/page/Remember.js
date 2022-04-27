import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../context";

const Remember = () => {
  const { count, selectDb, wordList, handleWordList } = useMyContext();
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

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
        <div
          onClick={() => {
            navigate("/choice");
          }}
        >
          记完了,开始测试。
        </div>
      ) : (
        <>
          <div>
            <div>
              {wordList[index].headWord}
              {wordList[index].usphone}
            </div>
            <div>{wordList[index].tranCN}</div>
            <div>{wordList[index].phrase}</div>
            <div>{wordList[index].phraseCN}</div>
          </div>
          <button onClick={() => handleClick(false)}>记住了</button>
          <button onClick={() => handleClick(true, wordList[index].wordRank)}>
            太简单
          </button>
          <button onClick={handleClick}>发音</button>
        </>
      )}
    </div>
  );
};

export default Remember;
