import React, { createContext } from "react";
import useHeroContext from "features/heroes/heroContext";
import useAntiHeroContext from "features/antiHeroes/antiHeroContext";
import { HeroStoreSchema } from "features/heroes/heroTypes";
import { AntiHeroStoreSchema } from "features/antiHeroes/antiHeroTypes";

type RootStoreSchema = {
  heroStore: HeroStoreSchema;
  antiHeroStore: AntiHeroStoreSchema;
};

export const RootStoreContext = createContext<RootStoreSchema>(null);

const RootStore = ({ children }) => {
  const heroContext = useHeroContext();
  const antiHeroContext = useAntiHeroContext();

  return (
    <RootStoreContext.Provider
      value={{ heroStore: heroContext, antiHeroStore: antiHeroContext }}
    >
      {children}
    </RootStoreContext.Provider>
  );
};

export default RootStore;
