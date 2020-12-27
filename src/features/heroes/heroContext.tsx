import React from "react";
import { useLocalObservable } from "mobx-react-lite";

import { HeroModel, HeroStateType } from "./heroTypes";

import {
  getHeroesAxios,
  deleteHeroAxios,
  postHeroAxios,
  putHeroAxios,
} from "./heroService";

const initialValues: HeroStateType = {
  heroes: [] as HeroModel[],
  hero: {
    id: "",
    firstName: "",
    lastName: "",
    house: "",
    knownAs: "",
  } as HeroModel,
  isLoading: false,
  error: "",
};

const HeroContext = () => {
  const store = useLocalObservable(() => ({
    /*observables*/
    ...initialValues,

    /*non-asynchronous actions*/
    setHeroAction(hero: HeroModel) {
      store.hero = hero;
    },

    setErrorAction({ message }: any) {
      store.error = message;
    },

    /*computed values i.e. derived state*/
    get totalHeroesAction() {
      return store.heroes.length;
    },

    /*asynchronous actions*/
    async getHeroesAction() {
      store.setErrorAction("");
      store.isLoading = true;
      try {
        store.heroes = (await getHeroesAxios()).data;
      } catch (e) {
        store.setErrorAction(e);
      }
      store.isLoading = false;
    },

    // asynchronous actions (pessimistic UI update)
    async postHeroAction(newHero: HeroModel) {
      store.setErrorAction("");
      store.isLoading = true;
      try {
        store.heroes.push((await postHeroAxios(newHero)).data);
      } catch (e) {
        store.setErrorAction(e);
      }
      store.isLoading = false;
    },

    // asynchronous actions also. Optimistic UI update. No need for showing loader/spinner.
    async deleteHeroAction(id: string) {
      store.setErrorAction("");
      const previousHeroes = store.heroes;
      store.heroes = store.heroes.filter((h) => h.id !== id);
      try {
        await deleteHeroAxios(id);
      } catch (e) {
        store.setErrorAction(e);
        store.heroes = previousHeroes;
      }
    },

    async putHeroAction(updatedHero: HeroModel) {
      store.setErrorAction("");
      const index = store.heroes.findIndex((h) => h.id === updatedHero.id);
      const unedited = store.heroes[index];
      store.heroes[index] = updatedHero;
      store.setHeroAction(updatedHero);
      try {
        await putHeroAxios(updatedHero);
      } catch (e) {
        store.setErrorAction(e);
        store.heroes[index] = unedited;
        store.setHeroAction(unedited);
      }
    },
  }));

  return store;
};

export default HeroContext;
