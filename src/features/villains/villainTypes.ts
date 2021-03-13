export type VillainStateType = {
  villains: VillainModel[];
  villain: VillainModel;
  loading: boolean;
};

export type VillainModel = {
  id: string;
  firstName: string;
  lastName: string;
  house: string;
  knownAs: string;
};

export type VillainActionType = {
  /*non-async*/
  softDeleteVillainAction: (villain: VillainModel) => void;

  /*computed or derived values*/
  totalVillainsCount: () => number;

  /*async*/
  getVillainsAction: () => Promise<void>;
  deleteVillainAction: (id: string) => Promise<void>;
  postVillainAction: (villain: VillainModel) => Promise<void>;
};

export type VillainStoreSchema = {} & VillainStateType & VillainActionType;
