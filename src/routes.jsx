import React from "react";
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";

import Heroes from "./heroes/pages/Heroes";
import Villains from "./villains/pages/Villains";

const Routes = () => (
  <Switch>
    <Redirect path={"/"} to={"heroes"} exact />
    <Route path={"/heroes"} component={Heroes} exact />
    <Route path={"/villains"} component={Villains} exact />
    <Redirect exact from={"*"} to={"/"} />
  </Switch>
);

export default Routes;
