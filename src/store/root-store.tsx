import React, { createContext } from "react";
import useHeroContext from "../heroes/hero-context";
import useVillainContext from "../villains/villain-context";
import { HeroStoreSchema } from "../heroes/hero-types";
import { VillainStoreSchema } from "../villains/villain-types";

type RootStoreSchema = {
  heroes: HeroStoreSchema;
  villains: VillainStoreSchema;
};

export const RootStoreContext = createContext<RootStoreSchema>(null);

const RootStore = ({ children }) => {
  const heroes = useHeroContext();
  const villains = useVillainContext();

  return (
    <RootStoreContext.Provider value={{ heroes, villains }}>
      {children}
    </RootStoreContext.Provider>
  );
};

export default RootStore;
