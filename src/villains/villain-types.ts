export type VillainStateType = {
  villains: Villain[];
  villain: Villain;
  error: string;
  isLoading: boolean;
};

export type Villain = {
  id: string;
  firstName: string;
  lastName: string;
  house: string;
  knownAs: string;
};

export type VillainActionType = {
  /*non-asynchronous*/
  setVillain: (hero: Villain) => void;
  setError: (error: any) => void;

  /*computed or derived values*/
  totalVillains: () => number;

  /*asynchronous*/
  getVillains: () => Promise<void>;
  getVillainById: (id: string) => Promise<void>;
  postVillain: (hero: Villain) => Promise<void>;
  putVillain: (hero: Villain) => Promise<void>;
  deleteVillain: (id: string) => Promise<void>;
};

export type VillainStoreSchema = {} & VillainStateType & VillainActionType;
