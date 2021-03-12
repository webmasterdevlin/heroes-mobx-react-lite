export type VillainStateType = {
  villains: VillainModel[];
  villain: VillainModel;
  error: string;
  loading: boolean;
};

export type VillainModel = {
  id: string;
  firstName: string;
  lastName: string;
  house: string;
  knownAs: string;
};
// FIX: all any
export type VillainActionType = {
  /*non-async*/
  setErrorAction: (error: any) => void;
  setVillainAction: (villain: VillainModel) => void;
  softDeleteVillainAction: (villain: VillainModel) => void;

  /*computed or derived values*/
  totalVillainsCount: () => number;

  /*async*/
  getVillainsAction: () => Promise<void>;
  deleteVillainAction: (id: string) => Promise<void>;
  postVillainAction: (villain: VillainModel) => Promise<void>;
  putVillainAction: (villain: VillainModel) => Promise<void>;
};

export type VillainStoreSchema = {} & VillainStateType & VillainActionType;
