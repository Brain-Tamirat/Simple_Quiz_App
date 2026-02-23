import React from "react";
import c from "./Layout.module.css";
import Header from "../Header/Header";

export default function Layout({ children }) {
  return (
    <div className={c.l_container}>
      <Header />
      {children}
    </div>
  );
}
