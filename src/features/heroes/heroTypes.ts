export type HeroStateType = {
  heroes: HeroModel[];
  hero: HeroModel;
  error: string;
  isLoading: boolean;
};

export type HeroModel = {
  id: string;
  firstName: string;
  lastName: string;
  house: string;
  knownAs: string;
};
// FIX: all any
export type HeroActionType = {
  /*non-async*/
  setErrorAction: (error: any) => void;
  setHeroAction: (hero: HeroModel) => void;

  /*computed or derived values*/
  totalHeroesAction: () => number;

  /*async*/
  getHeroesAction: () => Promise<void>;
  deleteHeroAction: (id: string) => Promise<void>;
  postHeroAction: (hero: HeroModel) => Promise<void>;
  putHeroAction: (hero: HeroModel) => Promise<void>;
};

export type HeroStoreSchema = {} & HeroStateType & HeroActionType;
