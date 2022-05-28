import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../context";
import Congratulate from "./Congratulate";

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

  console.log("wordList222", wordList);

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
    if (filterList.length === 0) return;
    let incorrectWords = selectDb.getRandomWords(2, selectDb.TABLE_NAME);
    //排除重复
    for (const i of incorrectWords) {
      if (i.wordRank === filterList[index].wordRank) {
        incorrectWords = selectDb.getRandomWords(selectDb.TABLE_NAME);
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
    if (showAnswer) return;
    let correctAnswer = filterList[index].headWord;
    if (word === correctAnswer) {
      //答对
      selectDb.updateWord(filterList[index].wordRank, 1);
      selectDb.updateCount();
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
        id="too-easy-page"
        onClick={() => {
          navigate("/");
        }}
      >
        这些词对你来说太简单了
        <br />
        换一些吧！
      </div>
    );
  }

  return (
    <>
      {status ? (
        <Congratulate />
      ) : (
        <div className="choice-page">
          <div className="question">
            <span>{filterList[index].tranCN}</span>
          </div>
          <div className="answers">
            {answers.map((word, index) => {
              return (
                <button
                  key={index}
                  id={`option-${index + 1}`}
                  onClick={() => handleClick(word)}
                  className="answer"
                >{`${word}`}</button>
              );
            })}
          </div>
          {showAnswer ? (
            <div className="boo">{`答错了。正确答案是： ${filterList[index].headWord}`}</div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default Choice;
