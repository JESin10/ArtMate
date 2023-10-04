import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Page from "./page/Page";

export default function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Page />
      </BrowserRouter>
    </React.Fragment>
  );
}
