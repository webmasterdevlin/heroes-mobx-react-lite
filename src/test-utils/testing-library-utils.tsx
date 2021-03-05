import React from "react";
import { render as rtlRender } from "@testing-library/react";

// Import your own reducer
import { initialValues as reducerInitialState } from "features/antiHeroes/antiHeroContext";

import RootStore from "../store/rootStore";
import { BrowserRouter } from "react-router-dom";
import HeaderNav from "../components/HeaderNav";

function render(
  ui,
  { initialState = reducerInitialState, ...renderOptions } = {}
) {
  function Wrapper({ children }) {
    return (
      <RootStore>
        <BrowserRouter>
          <HeaderNav />
          {children}
        </BrowserRouter>
      </RootStore>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
