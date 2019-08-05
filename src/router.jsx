import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Heroes from "./heroes/pages/Heroes";
import Villains from "./villains/pages/Villains";
import EditHero from "./heroes/pages/EditHero";
import EditVillain from "./villains/pages/EditVillain";

const Router = () => (
  <Switch>
    <Route path="/heroes" component={Heroes} />
    <Route path="/villains" component={Villains} />
    <Route path="/edit-hero/:id" component={EditHero} />
    <Route path="/edit-villain/:id" component={EditVillain} />
    <Redirect from="/" exact to="/heroes" />
  </Switch>
);

export default Router;
