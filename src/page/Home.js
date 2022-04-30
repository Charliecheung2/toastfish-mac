import React from "react";
import "../App.scss";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../context";
<<<<<<< HEAD
import { Select } from "antd";
const { Option } = Select;
=======
import "../index.scss";
>>>>>>> 43573fdc0ac517535a415079dd1102b10641da6b

const Home = () => {
  const { handleCount, createWordList } = useMyContext();
  let navigate = useNavigate();

  const handleChange = (value) => {
    handleCount(value);
    createWordList(value);
    navigate("/remember");
  };

  return (
<<<<<<< HEAD
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
=======
    <div>
      <p>这次要背多少个？</p>
      <select name="todoCount" id="todoCount" onChange={handleChange}>
        <option value="null">请选择</option>
        <option value="3">3</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      {/* <Link to="/remember" onClick={() => {}}>
        start
      </Link> */}
>>>>>>> 43573fdc0ac517535a415079dd1102b10641da6b
    </div>
  );
};

export default Home;
