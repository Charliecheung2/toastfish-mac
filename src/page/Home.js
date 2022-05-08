import React from "react";
import "../App.scss";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../context";
import { Select } from "antd";
const { Option } = Select;

const Home = () => {
  const { handleCount, createWordList, count } = useMyContext();
  let navigate = useNavigate();

  const handleChange = (value) => {
    handleCount(value);
    createWordList(value);
    navigate("/remember");
  };

  return (
    <div className="home-container">
      <div className="question">这次要背多少个？</div>
      <Select
        placeholder={count}
        style={{ width: 120 }}
        id="todoCount"
        virtual={false}
        className="select-class"
        dropdownClassName="options-class"
        onChange={handleChange}
      >
        <Option className="option-class" value="2">
          2
        </Option>
        <Option className="option-class" value="10">
          10
        </Option>
        <Option className="option-class" value="15">
          15
        </Option>
        <Option className="option-class" value="20">
          20
        </Option>
      </Select>
      <div
        className="start"
        onClick={() => {
          createWordList(count);
          navigate("/remember");
        }}
      >
        开始
      </div>
    </div>
  );
};

export default Home;
