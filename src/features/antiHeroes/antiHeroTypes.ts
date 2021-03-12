export type AntiHeroStateType = {
  antiHeroes: AntiHeroModel[];
  antiHero: AntiHeroModel;
  error: string;
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
  setAntiHeroAction: (antiHero: AntiHeroModel) => void;
  setErrorAction: (error: any) => void;
  softDeleteAntiHeroAction: (antiHero: AntiHeroModel) => void;

  /*computed or derived values*/
  totalAntiHeroesAction: () => number;

  /*asynchronous*/
  getAntiHeroesAction: () => Promise<void>;
  postAntiHeroAction: (antiHero: AntiHeroModel) => Promise<void>;
  putAntiHeroAction: (antiHero: AntiHeroModel) => Promise<void>;
  deleteAntiHeroAction: (id: string) => Promise<void>;
};

export type AntiHeroStoreSchema = {} & AntiHeroStateType & AntiHeroActionType;
