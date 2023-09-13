import React from "react";
import "./App.css";
import tw from "tailwind-styled-components";
import Home from "./page/Home";

function App() {
  return (
    <BasicDiv>
      <Home />
    </BasicDiv>
  );
}

export default App;

const BasicDiv = tw.div`
w-mobileWidth h-screen mx-auto
border-2 border-solid border-black
`;
