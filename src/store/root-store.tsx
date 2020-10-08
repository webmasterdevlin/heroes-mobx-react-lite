import React, { createContext } from "react";
import useHeroContext from "../heroes/hero-context";
import useVillainContext from "../villains/villain-context";
import { HeroStoreSchema } from "../heroes/hero-types";
import { VillainStoreSchema } from "../villains/villain-types";

type RootStoreSchema = {
  heroStore: HeroStoreSchema;
  villainStore: VillainStoreSchema;
};

export const RootStoreContext = createContext<RootStoreSchema>(null);

const RootStore = ({ children }) => {
  const heroContext = useHeroContext();
  const villainContext = useVillainContext();

  return (
    <RootStoreContext.Provider
      value={{ heroStore: heroContext, villainStore: villainContext }}
    >
      {children}
    </RootStoreContext.Provider>
  );
};

export default RootStore;
