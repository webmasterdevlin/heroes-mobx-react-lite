import React from "react";
import { EndPoints } from "axios/api-config";
import { deleteAxios, getAxios, postAxios } from "axios/generic-api-calls";
import { useLocalObservable } from "mobx-react-lite";

import { AntiHeroModel, AntiHeroStateType } from "./antiHeroTypes";
import { runInAction } from "mobx";

const initialValues: AntiHeroStateType = {
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

      runInAction(() => {
        store.isLoading = true;
      });

      try {
        const { data } = await getAxios(EndPoints.antiHeroes);
        runInAction(() => {
          store.antiHeroes = data;
        });
      } catch (e) {
        store.setErrorAction(e);
      }

      runInAction(() => {
        store.isLoading = false;
      });
    },

    // asynchronous actions (pessimistic UI update)
    async postAntiHeroAction(newAntiHero: AntiHeroModel) {
      store.setErrorAction("");
      store.isLoading = true;
      try {
        store.antiHeroes.push(
          (await postAxios(EndPoints.antiHeroes, newAntiHero)).data
        );
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
        await deleteAxios(EndPoints.antiHeroes, id);
      } catch (e) {
        store.setErrorAction(e);
        store.antiHeroes = previousAntiHeroes;
      }
    },
  }));

  return store;
};

export default AntiHeroContext;
