import React, { Context, createContext } from "react";
import { useLocalStore } from "mobx-react-lite";
import {
  deleteHero,
  getHeroById,
  getHeroes,
  postHero,
  putHero,
} from "./hero-service";
import { Hero, HeroStateType, HeroStoreSchema } from "./hero-types";

const initialValues: HeroStateType = {
  heroes: [],
  hero: {
    id: "",
    firstName: "",
    lastName: "",
    house: "",
    knownAs: "",
  },
  isLoading: false,
  error: "",
};

export const HeroProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    /*observables*/
    ...initialValues,
    /*actions*/
    async getHeroes() {
      store.isLoading = true;
      try {
        store.heroes = (await getHeroes()).data;
      } catch (e) {
        store.setError(e);
      }
      store.isLoading = false;
    },
    async getHeroById(id: string) {
      store.isLoading = true;
      try {
        const { data } = await getHeroById(id);
        store.hero = data;
      } catch (e) {
        store.setError(e);
      }
      store.isLoading = false;
    },
    async postHero(newHero: Hero) {
      store.isLoading = true;
      try {
        store.heroes.unshift((await postHero(newHero)).data);
      } catch (e) {
        store.setError(e);
      }
      store.isLoading = false;
    },
    // pessimistic UI update
    async deleteHero(id: string) {
      store.isLoading = true;
      try {
        await deleteHero(id);
        store.heroes = store.heroes.filter((h) => h.id !== id);
      } catch (e) {
        store.setError(e);
      }
      store.isLoading = false;
    },
    async putHero(updatedHero: Hero) {
      store.isLoading = true;
      try {
        await putHero(updatedHero);
        const index = store.heroes.findIndex((h) => h.id === updatedHero.id);
        store.heroes[index] = updatedHero;
      } catch (e) {
        store.setError(e);
      }
      store.isLoading = false;
    },
    setHero(hero: Hero) {
      store.hero = hero;
    },
    setError({ message }: any) {
      store.error = message;
      alert(message);
    },
    /*computed values i.e. derived state*/
    get totalHeroes() {
      return store.heroes.length;
    },
  }));
  return <heroContext.Provider value={store}>{children}</heroContext.Provider>;
};
export const heroContext = createContext<HeroStoreSchema>(null);
