import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Routes = () => (
  <Suspense fallback={<h2>Loading..</h2>}>
    <Switch>
      <Redirect path={"/"} to={"heroes"} exact />
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
