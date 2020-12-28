import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import HomePage from "pages/HomePage";

const Routes = () => (
  <Suspense fallback={<h2>Loading..</h2>}>
    <Switch>
      <Route path={"/"} component={HomePage} exact />
      <Route
        path={"/heroes"}
        component={lazy(() => import("./pages/HeroesPage"))}
        exact
      />
      <Route
        path={"/anti-heroes"}
        component={lazy(() => import("./pages/AntiHeroesPage"))}
        exact
      />
      <Redirect exact from={"*"} to={"/"} />
    </Switch>
  </Suspense>
);

export default Routes;
