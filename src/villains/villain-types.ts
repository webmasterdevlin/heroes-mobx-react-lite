export type VillainStateType = {
  villains: VillainModel[];
  villain: VillainModel;
  error: string;
  isLoading: boolean;
};

export type VillainModel = {
  id: string;
  firstName: string;
  lastName: string;
  house: string;
  knownAs: string;
};

export type VillainActionType = {
  /*non-asynchronous*/
  setVillainAction: (villain: VillainModel) => void;
  setErrorAction: (error: any) => void;

  /*computed or derived values*/
  totalVillainsAction: () => number;

  /*asynchronous*/
  getVillainsAction: () => Promise<void>;
  postVillainAction: (villain: VillainModel) => Promise<void>;
  putVillainAction: (villain: VillainModel) => Promise<void>;
  deleteVillainAction: (id: string) => Promise<void>;
};

export type VillainStoreSchema = {} & VillainStateType & VillainActionType;
