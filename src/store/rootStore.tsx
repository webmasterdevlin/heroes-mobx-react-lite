import React from "react";

import { villainContext } from "../villains/villain-context";
import { heroContext } from "../heroes/hero-context";

const StoreContext = React.createContext({
  heroes: undefined,
  villains: undefined,
});

const RootStore = ({ children }) => {
  return <StoreContext.Provider value={null}>{children}</StoreContext.Provider>;
};

export default RootStore;
