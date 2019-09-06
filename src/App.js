import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RootRouter from "./root-router";
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
              <RootRouter />
            </div>
          </>
        </BrowserRouter>
      </HeroProvider>
    </VillainProvider>
  );
}

export default App;
