import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../context";

const Choice = () => {
  const { wordList, selectDb } = useMyContext();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [status, setStatus] = useState(false);
  const [filterList, setFilterList] = useState(
    wordList.filter((i) => i.status === 0)
  );
  const navigate = useNavigate();
  let correctAnswer = filterList[index].headWord;

  useEffect(() => {
    let incorrectWords = selectDb.getRandomWords(2);
    //排除重复
    for (const i of incorrectWords) {
      if (i.wordRank === filterList[index].wordRank) {
        incorrectWords = selectDb.getRandomWords(2);
      }
    }
    //打乱答案顺序
    let randomIndex = Math.floor(Math.random() * 3);
    let shuffled = incorrectWords.map((i) => i.headWord);
    shuffled.splice(randomIndex, 0, correctAnswer);
    setAnswers(shuffled);
  }, [index]);

  const handleClick = (word) => {
    if (index >= filterList.length) {
      setStatus(true);
      return;
    } else {
      //验证答案
      if (word === correctAnswer) {
        setIndex(index + 1);
      } else {
        setShowAnswer(true);
        setTimeout(() => {
          setIndex(index + 1);
          setShowAnswer(false);
        }, 2000);
      }
    }
  };

  if (filterList.length === 0) {
    return (
      <div
        onClick={() => {
          navigate("/");
        }}
      >
        这些词对你来说太简单了，换一些吧！
      </div>
    );
  }

  return (
    <>
      {status ? (
        "全部通过！"
      ) : (
        <div>
          <div>{filterList[index].tranCN}</div>
          <div>
            {answers.map((word, index) => {
              return (
                <button onClick={() => handleClick(word)}>{`${
                  index + 1
                }. ${word}`}</button>
              );
            })}
          </div>
          {showAnswer ? (
            <div>{`答错了。正确答案是： ${correctAnswer}`}</div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default Choice;
