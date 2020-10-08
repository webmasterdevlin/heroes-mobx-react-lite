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
  setVillainAction: (hero: Villain) => void;
  setErrorAction: (error: any) => void;

  /*computed or derived values*/
  totalVillainsAction: () => number;

  /*asynchronous*/
  getVillainsAction: () => Promise<void>;
  getVillainByIdAction: (id: string) => Promise<void>;
  postVillainAction: (hero: Villain) => Promise<void>;
  putVillainAction: (hero: Villain) => Promise<void>;
  deleteVillainAction: (id: string) => Promise<void>;
};

export type VillainStoreSchema = {} & VillainStateType & VillainActionType;
