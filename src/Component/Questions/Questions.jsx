import React from "react";
import c from "./Questions.module.css";

export default function Questions({
  question,
  onChoice,
  choosen,
  correct,
  onNext,
}) {
  return (
    <div className={c.q_container}>
      <div className={c.qc_question}>
        <h2>{question.question !== undefined && question.question}</h2>
        <div className={c.qc_choice}>
          {question.options !== undefined &&
            question.options.map((val, ix) => {
              return (
                <button
                  key={ix}
                  className={`${choosen > -1 && (correct == ix ? c.selected_choice : c.not_selected_choice)} ${choosen > -1 && (choosen == ix ? c.correct_answer : "")}`}
                  onClick={() => {
                    if (choosen < 0) onChoice(ix);
                  }}
                  onMouseEnter={(e) => {
                    if (choosen < 0) {
                      e.target.classList.add(c.hover_effect);
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (choosen < 0) {
                      e.target.classList.remove(c.hover_effect);
                    }
                  }}
                >
                  {val}
                </button>
              );
            })}
        </div>
      </div>
      <div className={c.qc_next}>
        <button
          style={
            choosen < 0 ? { cursor: "not-allowed" } : { cursor: "pointer" }
          }
          onClick={() => {
            if (choosen > -1) onNext();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
