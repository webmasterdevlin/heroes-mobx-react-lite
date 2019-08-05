import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import HeaderNav from "./shared/components/HeaderNav";
import { HeroProvider } from "./heroes/hero-context";
import { VillainProvider } from "./villains/villain-context";

function App() {
  return (
    <VillainProvider>
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
    </VillainProvider>
  );
}

export default App;
