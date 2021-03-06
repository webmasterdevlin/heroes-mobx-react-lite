import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render as rtlRender } from "@testing-library/react";
import { initialValues as reducerInitialState } from "features/antiHeroes/antiHeroContext";

import RootStore from "../store/rootStore";
import HeaderNav from "../components/HeaderNav";

const render = (
  ui,
  { initialState = reducerInitialState, ...renderOptions } = {}
) => {
  const Wrapper = ({ children }) => (
    <RootStore>
      <BrowserRouter>
        <HeaderNav />
        <div className="container">
          <div className="vertical-center">{children}</div>
        </div>
      </BrowserRouter>
    </RootStore>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
