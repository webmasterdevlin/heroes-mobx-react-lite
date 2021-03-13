export type HeroStateType = {
  heroes: HeroModel[];
  hero: HeroModel;
  loading: boolean;
};

export type HeroModel = {
  id: string;
  firstName: string;
  lastName: string;
  house: string;
  knownAs: string;
};

export type HeroActionType = {
  /*non-async*/
  softDeleteHeroAction: (hero: HeroModel) => void;

  /*computed or derived values*/
  totalHeroesCount: () => number;

  /*async*/
  getHeroesAction: () => Promise<void>;
  deleteHeroAction: (id: string) => Promise<void>;
  postHeroAction: (hero: HeroModel) => Promise<void>;
};

export type HeroStoreSchema = {} & HeroStateType & HeroActionType;
