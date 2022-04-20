import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMyContext } from "../context";

const Remember = () => {
  const { count, selectDb } = useMyContext();
  const wordList = selectDb.getRandomWordList(count);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState(false);
  console.log("wordList", wordList);

  const handleClick = () => {
    if (index === count - 1) {
      setStatus(true);
      return;
    }
    setIndex(index + 1);
  };
  return (
    <div>
      {status ? (
        <div>记完了</div>
      ) : (
        <>
          <div>
            {wordList[index].headWord}
            {wordList[index].usphone}
          </div>
          <button onClick={handleClick}>记住了</button>
        </>
      )}
    </div>s
  );
};

export default Remember;
