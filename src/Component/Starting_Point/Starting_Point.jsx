import React from "react";
import c from "./Starting_Point.module.css";

export default function Starting_Point({ total, onStart }) {
  return (
    <div className={c.sp_container}>
      <h1>Welcome to The React Quiz!</h1>
      <h2>{total} questions to test your React mastery</h2>
      <button onClick={onStart}>Let's start!</button>
    </div>
  );
}
