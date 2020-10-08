import React from "react";
import { useLocalObservable } from "mobx-react-lite";
import {
  deleteHero,
  getHeroById,
  getHeroes,
  postHero,
  putHero,
} from "./hero-service";
import { Hero, HeroStateType } from "./hero-types";

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

const HeroContext = () => {
  const store = useLocalObservable(() => ({
    /*observables*/
    ...initialValues,

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
        await deleteHero(id);
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
  }));
  return store;
};

export default HeroContext;
