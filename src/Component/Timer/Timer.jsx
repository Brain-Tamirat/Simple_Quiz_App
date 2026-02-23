import React, { useEffect, useState } from "react";
import c from "./Timer.module.css";

export default function Timer({ onTimeEnd }) {
  const [time, setTime] = useState("00:30");
  useEffect(() => {
    let timer = 30;
    let countdown = setInterval(function () {
      let minutes = Math.floor(timer / 60);
      let seconds = timer % 60;

      setTime(
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
      );

      if (--timer < 0) {
        clearInterval(countdown);
        setTime("00:30");
        onTimeEnd();
      }
    }, 1000);
  }, [onTimeEnd]);
  return (
    <div className={c.t_container}>
      <button>{time}</button>
    </div>
  );
}
