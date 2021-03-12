import React from "react";
import RootStore from "../store/rootStore";
import { render as rtlRender } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Container } from "@material-ui/core";
import NavigationBar from "../components/NavigationBar";

const render = (ui, { ...renderOptions } = {}) => {
  const Wrapper = ({ children }) => (
    <RootStore>
      <CssBaseline>
        <BrowserRouter>
          <>
            <NavigationBar />
            <Container>{children}</Container>
          </>
        </BrowserRouter>
      </CssBaseline>
    </RootStore>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
