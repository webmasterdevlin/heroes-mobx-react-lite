import React from "react";
import { BrowserRouter } from "react-router-dom";

import Routes from "./routes";
import HeaderNav from "components/HeaderNav";
import RootStore from "store/rootStore";

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
