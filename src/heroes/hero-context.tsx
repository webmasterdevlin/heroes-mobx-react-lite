import React from "react";
import { useLocalObservable } from "mobx-react-lite";
import {
  deleteHeroAxios,
  getHeroByIdAxios,
  getHeroesAxios,
  postHeroAxios,
  putHeroAxios,
} from "./hero-service";
import { HeroModel, HeroStateType } from "./hero-types";

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
    setHeroAction(hero: HeroModel) {
      store.hero = hero;
    },
    setErrorAction({ message }: any) {
      store.error = message;
      console.log(message);
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
      } finally {
        store.isLoading = false;
      }
    },
    async getHeroByIdAction(id: string) {
      store.setErrorAction("");
      store.isLoading = true;
      try {
        const { data } = await getHeroByIdAxios(id);
        store.hero = data;
      } catch (e) {
        store.setErrorAction(e);
      } finally {
        store.isLoading = false;
      }
    },
    async postHeroAction(newHero: HeroModel) {
      store.setErrorAction("");
      store.isLoading = true;
      try {
        store.heroes.unshift((await postHeroAxios(newHero)).data);
      } catch (e) {
        store.setErrorAction(e);
      } finally {
        store.isLoading = false;
      }
    },
    // asynchronous actions (pessimistic UI update)
    async deleteHeroAction(id: string) {
      store.setErrorAction("");
      store.isLoading = true;
      try {
        await deleteHeroAxios(id);
        store.heroes = store.heroes.filter((h) => h.id !== id);
      } catch (e) {
        store.setErrorAction(e);
      } finally {
        store.isLoading = false;
      }
    },
    async putHeroAction(updatedHero: HeroModel) {
      store.setErrorAction("");
      store.isLoading = true;
      try {
        await putHeroAxios(updatedHero);
        const index = store.heroes.findIndex((h) => h.id === updatedHero.id);
        store.heroes[index] = updatedHero;
      } catch (e) {
        store.setErrorAction(e);
      } finally {
        store.isLoading = false;
      }
    },
  }));
  return store;
};

export default HeroContext;
