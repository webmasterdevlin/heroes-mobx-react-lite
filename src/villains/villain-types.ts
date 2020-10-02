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
// FIX: all any
export type VillainActionType = {
  getVillains: () => Promise<void>;
  getVillainById: (id: string) => Promise<void>;
  setError: (error: any) => void;
  postVillain: (hero: Villain) => Promise<void>;
  setVillain: (hero: Villain) => void;
  putVillain: (hero: Villain) => Promise<void>;
  deleteVillain: (id: string) => Promise<void>;
  totalVillains: () => number;
};

export type VillainStoreSchema = {} & VillainStateType & VillainActionType;
