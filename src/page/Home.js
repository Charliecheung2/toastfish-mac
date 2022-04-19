import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [book, setBook] = useState("CET4_1");
  const [count, setCount] = useState(10);

  useEffect(() => {
    const selectDb = new window.database.Select(book, count);
    // selectDb.getBookNameAndNumber();
    console.log(selectDb.TABLE_NAME);
    console.log(selectDb.WORD_NUMBER);
  }, [book, count]);

  return (
    <div>
      <p>这次要背多少个？</p>
      <select
        name="todoCount"
        id="todoCount"
        value={count}
        onChange={(e) => {
          setCount(e.target.value);
        }}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      <Link to="/remember" onClick={() => console.log("click")}>
        start
      </Link>
    </div>
  );
};

export default Home;
