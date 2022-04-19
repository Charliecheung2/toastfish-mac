import React from "react";
import { Link } from "react-router-dom";

const Remember = () => {
  return (
    <div>
      <Link to="/" onClick={() => console.log("click 2")}>
        back home
      </Link>
    </div>
  );
};

export default Remember;
