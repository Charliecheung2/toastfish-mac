import React, { useEffect } from "react";
import "../App.scss";
import { useNavigate } from "react-router-dom";
const confetti = require("canvas-confetti");

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function Confetti() {
  const navigate = useNavigate();
  console.log("a");
  useEffect(() => {
    let myCanvas = document.querySelector("#confetti");
    let myConfetti = confetti.create(myCanvas, {
      resize: true,
    });
    myConfetti({
      spread: randomInRange(60, 70),
      particleCount: randomInRange(50, 100),
      origin: { y: 1 },
      decay: 0.8,
    });

    return () => {};
  }, []);

  return (
    <>
      <div
        className="notice"
        onClick={() => {
          navigate("/");
        }}
      >
        背完啦
      </div>
      <canvas id="confetti" style={{ top: 0, position: "absolute" }}></canvas>
    </>
  );
}

// export default myCanvas;
export default Confetti;
