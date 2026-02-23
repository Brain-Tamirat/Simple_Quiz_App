import React from "react";
import c from "./Status.module.css";

export default function Status({ total, number, points, your_points }) {
  const accumilation =
    your_points.length > 0 ? your_points.reduce((p, c) => p + c) : 0;
  return (
    <div className={c.s_container}>
      <div className={c.sc_status_diagram}></div>
      <div className={c.sc_status}>
        <span className={c.sc_s_question}>
          Questions <span>{number + 1}</span> / {total}
        </span>
        <span className={c.sc_s_point}>
          <span>{accumilation}</span> / {points} points
        </span>
      </div>
    </div>
  );
}
