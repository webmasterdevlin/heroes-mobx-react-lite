import React, { createContext } from "react";
import { useLocalStore } from "mobx-react-lite";
import {
  deleteHero,
  getHeroById,
  getHeroes,
  postHero,
  putHero
} from "./hero-service";

export const heroContext = createContext();

export const HeroProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    /*observables*/
    heroes: [],
    hero: {
      id: "",
      firstName: "",
      lastName: "",
      house: "",
      knownAs: ""
    },
    isLoading: false,
    error: "",
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
    async getHeroById(id) {
      store.isLoading = true;
      try {
        store.hero = (await getHeroById(id)).data;
      } catch (e) {
        store.setError(e);
      }
      store.isLoading = false;
    },
    async postHero(newHero) {
      store.isLoading = true;
      try {
        store.heroes.unshift((await postHero(newHero)).data);
      } catch (e) {
        store.setError(e);
      }
      store.isLoading = false;
    },
    async deleteHero(id) {
      store.isLoading = true;
      try {
        await deleteHero(id);
        store.heroes = store.heroes.filter(h => h.id !== id);
      } catch (e) {
        store.setError(e);
      }
      store.isLoading = false;
    },
    async putHero(updatedHero) {
      store.isLoading = true;
      try {
        await putHero(updatedHero);
        const index = store.heroes.findIndex(h => h.id === updatedHero.id);
        store.heroes[index] = updatedHero;
      } catch (e) {
        store.setError(e);
      }
      store.isLoading = false;
    },
    setHero(hero) {
      store.hero = hero;
    },
    setError({ message }) {
      store.error = message;
      alert(message);
    },
    /*computed values*/
    get totalHeroes() {
      return store.heroes.length;
    }
  }));
  return <heroContext.Provider value={store}>{children}</heroContext.Provider>;
};
