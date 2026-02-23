import React, { useReducer } from "react";
import c from "./DateCounter.module.css";

const initail_state = { count: 0, range: 1 };

function reducer(current, action) {
  switch (action.type) {
    case "dec":
      return { ...current, count: current.count - current.range };
    case "inc":
      return { ...current, count: current.count + current.range };
    case "set_count":
      return { ...current, count: action.payload };
    case "set_range":
      return { ...current, range: action.payload };
    case "reset":
      return initail_state;
    default:
      throw new Error("Some Error Occured!");
  }
}

export default function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initail_state);
  const { count, range } = state;

  const to_get_date = new Date();
  to_get_date.setDate(to_get_date.getDate() + count);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function onReset() {
    dispatch({ type: "reset" });
  }

  function onDecline() {
    dispatch({ type: "dec" });
  }

  function onIncline() {
    dispatch({ type: "inc" });
  }

  function onGivenNumber(e) {
    dispatch({ type: "set_count", payload: Number(e.target.value) });
  }

  function onRange(e) {
    dispatch({ type: "set_range", payload: Number(e.target.value) });
  }

  return (
    <div className={c.dc_container}>
      <label htmlFor="jump_range">
        <input
          type="range"
          name="jump_range"
          id="jump_range"
          min="1"
          max="10"
          onChange={onRange}
          value={range}
        />
        <span>{range}</span>
      </label>
      <div>
        <button onClick={onDecline}>-</button>
        <label htmlFor="date_changed_by">
          <input
            type="text"
            name="date_changed_by"
            id="date_changed_by"
            value={count}
            onChange={onGivenNumber}
          />
        </label>
        <button onClick={onIncline}>+</button>
      </div>
      <p>{`${days[to_get_date.getDay()]} ${months[to_get_date.getMonth()]} ${to_get_date.getDate()} ${to_get_date.getFullYear()}`}</p>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}
