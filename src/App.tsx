import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RootRouter from "./root-router";
import HeaderNav from "./shared/components/HeaderNav";
import RootStore from "./store/rootStore";

function App() {
  return (
    <RootStore>
      <BrowserRouter>
        <>
          <HeaderNav />
          <div className="container">
            <RootRouter />
          </div>
        </>
      </BrowserRouter>
    </RootStore>
  );
}

export default App;
