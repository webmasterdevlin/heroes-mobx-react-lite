import React from "react";
import { BrowserRouter } from "react-router-dom";

import Routes from "./routes";
import HeaderNav from "./shared/components/HeaderNav";
import RootStore from "./store/root-store";

const App = () => (
  <RootStore>
    <BrowserRouter>
      <>
        <HeaderNav />
        <div className="container">
          <Routes />
        </div>
      </>
    </BrowserRouter>
  </RootStore>
);

export default App;
