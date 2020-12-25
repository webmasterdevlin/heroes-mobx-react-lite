import React from "react";
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";

import Heroes from "./heroes/pages/Heroes";
import Villains from "./villains/pages/Villains";
import EditHero from "./heroes/pages/EditHero";
import EditVillain from "./villains/pages/EditVillain";

const Routes = () => (
  <Switch>
    <Redirect path={"/"} to={"heroes"} exact />
    <Route path={"/heroes"} component={Heroes} exact />
    <Route path={"/edit-hero/:id"} component={EditHero} />
    <Route path={"/villains"} component={Villains} exact />
    <Route path={"/edit-villain/:id"} component={EditVillain} />
    <Redirect exact from={"*"} to={"/"} />
  </Switch>
);

export default Routes;
