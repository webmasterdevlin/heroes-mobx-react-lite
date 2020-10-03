import React, { createContext } from "react";
import { HeroContextV2 } from "../heroes/hero-context-v2";
import { VillainContextV2 } from "../villains/villain-context-v2";
import { HeroStoreSchema } from "../heroes/hero-types";
import { VillainStoreSchema } from "../villains/villain-types";

type RootStoreSchema = {
  heroesV2: HeroStoreSchema;
  villainsV2: VillainStoreSchema;
};

export const RootStoreContext = createContext<RootStoreSchema>(null);

const RootStore = ({ children }) => {
  const heroesV2 = HeroContextV2();
  const villainsV2 = VillainContextV2();

  return (
    <RootStoreContext.Provider value={{ heroesV2, villainsV2 }}>
      {children}
    </RootStoreContext.Provider>
  );
};

export default RootStore;
