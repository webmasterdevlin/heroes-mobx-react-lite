import React from "react";
import { BrowserRouter } from "react-router-dom";
import NavigationBar from "components/NavigationBar";
import routes, { renderRoutes } from "./Routes";
import { Container } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

const App = () => {
  return (
    <CssBaseline>
      <BrowserRouter>
        <>
          <NavigationBar />
          <Container>{renderRoutes(routes)}</Container>
        </>
      </BrowserRouter>
    </CssBaseline>
  );
};
export default App;
