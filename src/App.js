import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import HeaderNav from "./shared/components/HeaderNav";
import { HeroProvider } from "./heroes/hero-context";

function App() {
  return (
    <HeroProvider>
      <BrowserRouter>
        <>
          <HeaderNav />
          <div className="container">
            <Router />
          </div>
        </>
      </BrowserRouter>
    </HeroProvider>
  );
}

export default App;
