import React from "react";
import { Redirect, Router } from "@reach/router";
import Heroes from "./heroes/pages/Heroes";
import Villains from "./villains/pages/Villains";
import EditHero from "./heroes/pages/EditHero";
import EditVillain from "./villains/pages/EditVillain";

const RootRouter = () => (
  <Router>
    <Heroes path="heroes" />
    <Villains path="villains" />
    <EditHero path="edit-hero/:id" />
    <EditVillain path="edit-villain/:id" />
    <Redirect from="/" to="heroes" noThrow />
  </Router>
);

export default RootRouter;
