import React from "react";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../context";

const Home = () => {
  const { count, handleCount, createWordList } = useMyContext();
  let navigate = useNavigate();

  const handleChange = (e) => {
    handleCount(e);
    createWordList(e.target.value);
    navigate("/remember");
  };

  return (
    <div>
      <p>这次要背多少个？</p>
      <select name="todoCount" id="todoCount" onChange={handleChange}>
        <option value="null">请选择</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      {/* <Link to="/remember" onClick={() => {}}>
        start
      </Link> */}
    </div>
  );
};

export default Home;
