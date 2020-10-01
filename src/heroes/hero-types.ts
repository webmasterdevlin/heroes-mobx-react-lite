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
  getHeroById: any;
  setError: any;
  postHero: any;
  setHero: any;
  putHero: any;
  deleteHero: any;
  totalHeroes: any;
};

export type HeroStoreSchema = {} & HeroStateType & HeroActionType;
