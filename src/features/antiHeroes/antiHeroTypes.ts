export type AntiHeroStateType = {
  antiHeroes: AntiHeroModel[];
  antiHero: AntiHeroModel;
  loading: boolean;
};

export type AntiHeroModel = {
  id: string;
  firstName: string;
  lastName: string;
  house: string;
  knownAs: string;
};

export type AntiHeroActionType = {
  /*non-asynchronous*/
  softDeleteAntiHeroAction: (antiHero: AntiHeroModel) => void;

  /*computed or derived values*/
  totalAntiHeroesCount: () => number;

  /*asynchronous*/
  getAntiHeroesAction: () => Promise<void>;
  postAntiHeroAction: (antiHero: AntiHeroModel) => Promise<void>;
  putAntiHeroAction: (antiHero: AntiHeroModel) => Promise<void>;
  deleteAntiHeroAction: (id: string) => Promise<void>;
};

export type AntiHeroStoreSchema = {} & AntiHeroStateType & AntiHeroActionType;
