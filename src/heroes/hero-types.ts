export type HeroStateType = {
  heroes: Hero[];
  hero: Hero;
  error: string;
  isLoading: boolean;
};

export type Hero = {
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
  setHeroAction: (hero: Hero) => void;

  /*computed or derived values*/
  totalHeroesAction: () => number;

  /*async*/
  getHeroesAction: () => Promise<void>;
  deleteHeroAction: (id: string) => Promise<void>;
  postHeroAction: (hero: Hero) => Promise<void>;
  putHeroAction: (hero: Hero) => Promise<void>;
  getHeroByIdAction: (id: string) => Promise<void>;
};

export type HeroStoreSchema = {} & HeroStateType & HeroActionType;
