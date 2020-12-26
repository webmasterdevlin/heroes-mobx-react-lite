import React from "react";
import { BrowserRouter } from "react-router-dom";

import Routes from "./routes";
import HeaderNav from "shared/components/HeaderNav";
import RootStore from "store/root-store";

const App = () => (
  <RootStore>
    <BrowserRouter>
      <>
        <HeaderNav />
        <div className="container">
          <div className="vertical-center">
            <Routes />
          </div>
        </div>
      </>
    </BrowserRouter>
  </RootStore>
);

export default App;
