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
  loading: false,
};

/*
 * what is runInAction()?
 * https://stackoverflow.com/questions/57271153/mobx-runinaction-usage-why-do-we-need-it
 * */

const AntiHeroContext = () => {
  const store = useLocalObservable(() => ({
    /*observables*/
    ...initialValues,

    /*non-asynchronous actions*/
    softDeleteAntiHeroAction(antiHero: AntiHeroModel) {
      store.antiHeroes = store.antiHeroes.filter((ah) => ah.id !== antiHero.id);
    },

    /*asynchronous actions*/
    async getAntiHeroesAction() {
      runInAction(() => {
        store.loading = true;
      });

      try {
        const { data } = await getAxios<AntiHeroModel>(EndPoints.antiHeroes);
        runInAction(() => {
          store.antiHeroes = data;
        });
      } catch (e) {
        alert("Something happened. Please try again later.");
      }

      runInAction(() => {
        store.loading = false;
      });
    },

    // asynchronous actions also. Optimistic UI update. No need for showing loader/spinner.
    async deleteAntiHeroAction(id: string) {
      const previousAntiHeroes = store.antiHeroes;
      store.antiHeroes = store.antiHeroes.filter((ah) => ah.id !== id);
      try {
        await deleteAxios(EndPoints.antiHeroes, id);
      } catch (e) {
        alert("Something happened. Please try again later.");
        store.antiHeroes = previousAntiHeroes;
      }
    },

    // asynchronous actions (pessimistic UI update)
    async postAntiHeroAction(newAntiHero: AntiHeroModel) {
      try {
        const { data } = await postAxios(EndPoints.antiHeroes, newAntiHero);
        runInAction(() => {
          store.antiHeroes.push(data);
        });
      } catch (e) {
        alert("Something happened. Please try again later.");
      }
    },

    /*computed values i.e. derived state*/
    get totalAntiHeroesCount() {
      return store.antiHeroes.length;
    },
  }));

  return store;
};

export default AntiHeroContext;
