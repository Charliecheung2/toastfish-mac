import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../context";
<<<<<<< HEAD
import Congratulate from "./Congratulate";
=======
import confetti from "canvas-confetti";
>>>>>>> 43573fdc0ac517535a415079dd1102b10641da6b

const Choice = () => {
  const { wordList, selectDb, handleWordList } = useMyContext();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [status, setStatus] = useState(false);
  const [filterList, setFilterList] = useState(
    wordList.filter((i) => i.status === 0)
  );
  const navigate = useNavigate();

  //待添加“开始测试”提醒

  useEffect(() => {
    let incorrectWords = selectDb.getRandomWords(2);
    //排除重复
    for (const i of incorrectWords) {
      if (i.wordRank === filterList[index].wordRank) {
        incorrectWords = selectDb.getRandomWords(2);
      }
    }
    //打乱答案顺序
    let correctAnswer = filterList[index].headWord;
    let randomIndex = Math.floor(Math.random() * 3);
    let shuffled = incorrectWords.map((i) => i.headWord);
    shuffled.splice(randomIndex, 0, correctAnswer);
    setAnswers(shuffled);
  }, [index]);

  const handleClick = (word) => {
<<<<<<< HEAD
    handleWordList(filterList[index].wordRank);
=======
    //验证答案（待写改数据库Status）
    let correctAnswer = filterList[index].headWord;
>>>>>>> 43573fdc0ac517535a415079dd1102b10641da6b
    if (word === correctAnswer) {
      //答对
      if (index >= filterList.length - 1) {
        setStatus(true);
      } else {
        setIndex(index + 1);
      }
    } else {
      //答错
      setShowAnswer(true);
      setTimeout(() => {
        if (index >= filterList.length - 1) {
          setStatus(true);
        } else {
          setIndex(index + 1);
          setShowAnswer(false);
        }
      }, 2000);
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
<<<<<<< HEAD
        <Congratulate />
=======
        <div>全部通过！</div>
>>>>>>> 43573fdc0ac517535a415079dd1102b10641da6b
      ) : (
        <div>
          <div>{filterList[index].tranCN}</div>
          <div>
            {answers.map((word, index) => {
              return (
                <button key={index} onClick={() => handleClick(word)}>{`${
                  index + 1
                }. ${word}`}</button>
              );
            })}
          </div>
          {showAnswer ? (
            <div>{`答错了。正确答案是： ${filterList[index].headWord}`}</div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default Choice;
