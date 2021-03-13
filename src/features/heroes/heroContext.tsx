import React from "react";
import { EndPoints } from "axios/api-config";
import { deleteAxios, getAxios, postAxios } from "axios/generic-api-calls";
import { useLocalObservable } from "mobx-react-lite";

import { HeroModel, HeroStateType } from "./heroTypes";
import { runInAction } from "mobx";

const initialValues: HeroStateType = {
  heroes: [] as HeroModel[],
  hero: {
    id: "",
    firstName: "",
    lastName: "",
    house: "",
    knownAs: "",
  } as HeroModel,
  loading: false,
  error: "",
};

/*
 * what is runInAction()?
 * https://stackoverflow.com/questions/57271153/mobx-runinaction-usage-why-do-we-need-it
 * */

const HeroContext = () => {
  const store = useLocalObservable(() => ({
    /*observables*/
    ...initialValues,

    /*non-asynchronous actions*/
    setHeroAction(hero: HeroModel) {
      store.hero = hero;
    },

    softDeleteHeroAction(hero: HeroModel) {
      store.heroes = store.heroes.filter((h) => h.id !== hero.id);
    },

    setErrorAction({ message }: any) {
      store.error = message;
    },

    /*computed values i.e. derived state*/
    get totalHeroesCount() {
      return store.heroes.length;
    },

    /*asynchronous actions*/
    async getHeroesAction() {
      store.setErrorAction("");

      runInAction(() => {
        store.loading = true;
      });

      try {
        const { data } = await getAxios<HeroModel>(EndPoints.heroes);
        runInAction(() => {
          store.heroes = data;
        });
      } catch (e) {
        store.setErrorAction(e);
      }

      runInAction(() => {
        store.loading = false;
      });
    },

    // asynchronous actions also. Optimistic UI update. No need for showing loader/spinner.
    async deleteHeroAction(id: string) {
      store.setErrorAction("");
      const previousHeroes = store.heroes;
      store.heroes = store.heroes.filter((h) => h.id !== id);
      try {
        await deleteAxios(EndPoints.heroes, id);
      } catch (e) {
        store.setErrorAction(e);
        store.heroes = previousHeroes;
      }
    },

    // asynchronous actions (pessimistic UI update)
    async postHeroAction(newHero: HeroModel) {
      store.setErrorAction("");
      try {
        const { data } = await postAxios(EndPoints.heroes, newHero);
        runInAction(() => {
          store.heroes.push(data);
        });
      } catch (e) {
        store.setErrorAction(e);
      }
    },
  }));

  return store;
};

export default HeroContext;
