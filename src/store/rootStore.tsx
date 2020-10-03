import React, { createContext } from "react";
import { HeroContext } from "../heroes/hero-context";
import { VillainContext } from "../villains/villain-context";
import { HeroStoreSchema } from "../heroes/hero-types";
import { VillainStoreSchema } from "../villains/villain-types";

type RootStoreSchema = {
  heroes: HeroStoreSchema;
  villains: VillainStoreSchema;
};

export const RootStoreContext = createContext<RootStoreSchema>(null);

const RootStore = ({ children }) => {
  const heroes = HeroContext();
  const villains = VillainContext();

  return (
    <RootStoreContext.Provider value={{ heroes, villains }}>
      {children}
    </RootStoreContext.Provider>
  );
};

export default RootStore;
