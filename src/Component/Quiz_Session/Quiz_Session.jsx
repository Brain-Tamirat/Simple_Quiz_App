import React from "react";
import c from "./Quiz_Session.module.css";

export default function Quiz_Session({ children }) {
  return <div className={c.qs_container}>{children}</div>;
}
