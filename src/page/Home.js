import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../context";

const Home = () => {
  console.log("useMyContext", useMyContext());
  const { book, count, handleCount } = useMyContext();
  let navigate = useNavigate();

  return (
    <div>
      <p>这次要背多少个？</p>
      <select
        name="todoCount"
        id="todoCount"
        value={count}
        onChange={(e) => {
          handleCount(e);
          navigate("/remember");
        }}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      {/* <Link to="/remember" onClick={() => console.log("click")}>
        start
      </Link> */}
    </div>
  );
};

export default Home;
