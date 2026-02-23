import React, { useEffect, useReducer } from "react";
import Layout from "../../Component/Layout/Layout";
import Starting_Point from "../../Component/Starting_Point/Starting_Point";
import Quiz_Session from "../../Component/Quiz_Session/Quiz_Session";
import Status from "../../Component/Status/Status";
import Questions from "../../Component/Questions/Questions";
import Timer from "../../Component/Timer/Timer";

const initialState = {
  start: false,
  number: 0,
  total: 0,
  point: 0,
  your_answer: -1,
  correct_answer: -1,
  points_gained: [],
  question: {},
  data: [],
};

function reducer(current, action) {
  switch (action.type) {
    case "initail":
      return {
        ...current,
        total: action["payload"].length,
        point: action["payload"].reduce((p, c) => p + c.point, 0),
        data: action.payload,
        question: action.payload[0],
      };

    case "start":
      return {
        ...current,
        start: true,
      };

    case "choosed":
      return {
        ...current,
        your_answer: action.payload,
        correct_answer: current.data[current.number].correct,
        points_gained: [
          ...current.points_gained,
          current.data[current.number].correct == action.payload
            ? current.data[current.number].point
            : 0,
        ],
      };

    case "next":
      if (current.number == current.total - 1) {
        return initialState;
      }

      return {
        ...current,
        number: current.number + 1,
        timer: "",
        your_answer: -1,
        correct_answer: -1,
        question: current.data[current.number + 1],
      };

    case "time_end":
      return initialState;

    default:
      throw new Error("Something went Bloom!");
  }
}

export default function Landing() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "initail", payload: data });
      } catch (e) {
        console.log(e.message);
      }
    }
    getData();

    return;
  }, []);

  function handleChoice(num) {
    dispatch({ type: "choosed", payload: num });
  }

  function handleNext() {
    dispatch({ type: "next" });
  }

  function handleStart() {
    dispatch({ type: "start" });
  }

  function handleTimeEnd() {
    dispatch({ type: "time_end" });
  }

  return (
    <Layout>
      {!state.start ? (
        <Starting_Point total={state.total} onStart={handleStart} />
      ) : (
        <Quiz_Session>
          <Status
            total={state.total}
            points={state.point}
            number={state.number}
            your_points={state.points_gained}
          />
          <Questions
            question={state.question}
            onChoice={handleChoice}
            onNext={handleNext}
            choosen={state.your_answer}
            correct={state.correct_answer}
          />
          <Timer onTimeEnd={handleTimeEnd} />
        </Quiz_Session>
      )}
    </Layout>
  );
}
