import React from "react";
import c from "./Header.module.css";

export default function Header() {
  return (
    <header className={c.h_container}>
      <img
        className={c.h_img}
        src="src/assets/Pictures/React.png"
        alt="React"
      />
      <p className={c.doto_h_font}>The React Quiz</p>
    </header>
  );
}
