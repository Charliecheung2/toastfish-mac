import React from "react";
import "../App.scss";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../context";
import { Select } from "antd";
const { Option } = Select;

const Home = () => {
  const { handleCount, createWordList } = useMyContext();
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
        // defaultValue="null"
        placeholder="请选择"
        style={{ width: 120 }}
        id="todoCount"
        onChange={handleChange}
      >
        {/* <Option value="null">请选择</Option> */}
        <Option value="2">2</Option>
        <Option value="10">10</Option>
        <Option value="15">15</Option>
        <Option value="20">20</Option>
      </Select>
    </div>
  );
};

export default Home;
