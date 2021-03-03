import React from "react";
import { useLocalObservable } from "mobx-react-lite";

import { AntiHeroModel, AntiHeroStateType } from "./antiHeroTypes";
import {
  getAntiHeroesAxios,
  deleteAntiHeroAxios,
  postAntiHeroAxios,
  putAntiHeroAxios,
} from "./antiHeroService";

export const initialValues: AntiHeroStateType = {
  antiHeroes: [] as AntiHeroModel[],
  antiHero: {
    id: "",
    firstName: "",
    lastName: "",
    house: "",
    knownAs: "",
  } as AntiHeroModel,
  isLoading: false,
  error: "",
};

const AntiHeroContext = () => {
  const store = useLocalObservable(() => ({
    /*observables*/
    ...initialValues,

    /*non-asynchronous actions*/
    setAntiHeroAction(antiHero: AntiHeroModel) {
      store.antiHero = antiHero;
    },

    setErrorAction({ message }: any) {
      store.error = message;
    },

    /*computed values i.e. derived state*/
    get totalAntiHeroesAction() {
      return store.antiHeroes.length;
    },

    /*asynchronous actions*/
    async getAntiHeroesAction() {
      store.setErrorAction("");
      store.isLoading = true;
      try {
        store.antiHeroes = (await getAntiHeroesAxios()).data;
      } catch (e) {
        store.setErrorAction(e);
      }
      store.isLoading = false;
    },

    // asynchronous actions (pessimistic UI update)
    async postAntiHeroAction(newAntiHero: AntiHeroModel) {
      store.setErrorAction("");
      store.isLoading = true;
      try {
        store.antiHeroes.push((await postAntiHeroAxios(newAntiHero)).data);
      } catch (e) {
        store.setErrorAction(e);
      }
      store.isLoading = false;
    },

    // asynchronous actions also. Optimistic UI update. No need for showing loader/spinner.
    async deleteAntiHeroAction(id: string) {
      store.setErrorAction("");
      const previousAntiHeroes = store.antiHeroes;
      store.antiHeroes = store.antiHeroes.filter((h) => h.id !== id);
      try {
        await deleteAntiHeroAxios(id);
      } catch (e) {
        store.setErrorAction(e);
        store.antiHeroes = previousAntiHeroes;
      }
    },

    async putAntiHeroAction(updatedAntiHero: AntiHeroModel) {
      store.setErrorAction("");
      const index = store.antiHeroes.findIndex(
        (v) => v.id === updatedAntiHero.id
      );
      const unedited = store.antiHeroes[index];
      store.antiHeroes[index] = updatedAntiHero;
      store.setAntiHeroAction(updatedAntiHero);
      try {
        await putAntiHeroAxios(updatedAntiHero);
      } catch (e) {
        store.setErrorAction(e);
        store.antiHeroes[index] = unedited;
        store.setAntiHeroAction(unedited);
      }
    },
  }));

  return store;
};

export default AntiHeroContext;
