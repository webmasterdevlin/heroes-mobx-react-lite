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
  getHeroes: () => Promise<void>;
  getHeroById: (id: string) => Promise<void>;
  setError: (error: any) => void;
  postHero: (hero: Hero) => Promise<void>;
  setHero: (hero: Hero) => void;
  putHero: (hero: Hero) => Promise<void>;
  deleteHero: (id: string) => Promise<void>;
  totalHeroes: () => number;
};

export type HeroStoreSchema = {} & HeroStateType & HeroActionType;
