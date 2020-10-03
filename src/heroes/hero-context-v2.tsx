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

export const heroContextV2 = createContext<HeroStoreSchema>(null);

export const HeroContextV2 = () => {
  const store = useLocalStore(() => ({
    /*observables*/
    ...initialValues,

    /*asynchronous actions*/
    async getHeroes() {
      store.setError("");
      store.isLoading = true;
      try {
        store.heroes = (await getHeroes()).data;
      } catch (e) {
        store.setError(e);
      } finally {
        store.isLoading = false;
      }
    },
    async getHeroById(id: string) {
      store.setError("");
      store.isLoading = true;
      try {
        const { data } = await getHeroById(id);
        store.hero = data;
      } catch (e) {
        store.setError(e);
      } finally {
        store.isLoading = false;
      }
    },
    async postHero(newHero: Hero) {
      store.setError("");
      store.isLoading = true;
      try {
        store.heroes.unshift((await postHero(newHero)).data);
      } catch (e) {
        store.setError(e);
      } finally {
        store.isLoading = false;
      }
    },
    // asynchronous actions (pessimistic UI update)
    async deleteHero(id: string) {
      store.setError("");
      store.isLoading = true;
      try {
        await deleteHero(); // check
        store.heroes = store.heroes.filter((h) => h.id !== id);
      } catch (e) {
        store.setError(e);
      } finally {
        store.isLoading = false;
      }
    },
    async putHero(updatedHero: Hero) {
      store.setError("");
      store.isLoading = true;
      try {
        await putHero(updatedHero);
        const index = store.heroes.findIndex((h) => h.id === updatedHero.id);
        store.heroes[index] = updatedHero;
      } catch (e) {
        store.setError(e);
      } finally {
        store.isLoading = false;
      }
    },

    /*non-asynchronous actions*/
    setHero(hero: Hero) {
      store.hero = hero;
    },
    setError({ message }: any) {
      store.error = message;
      console.log(message);
    },

    /*computed values i.e. derived state*/
    get totalHeroes() {
      return store.heroes.length;
    },
  }));
  return store;
};
