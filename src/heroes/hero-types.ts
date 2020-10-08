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
  setError: (error: any) => void;
  setHero: (hero: Hero) => void;

  /*computed or derived values*/
  totalHeroes: () => number;

  /*async*/
  getHeroes: () => Promise<void>;
  deleteHero: (id: string) => Promise<void>;
  postHero: (hero: Hero) => Promise<void>;
  putHero: (hero: Hero) => Promise<void>;
  getHeroById: (id: string) => Promise<void>;
};

export type HeroStoreSchema = {} & HeroStateType & HeroActionType;
