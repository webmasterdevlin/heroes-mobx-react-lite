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

      runInAction(() => {
        store.loading = true;
      });

      try {
        const { data } = await getAxios(EndPoints.heroes);
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

    // asynchronous actions (pessimistic UI update)
    async postHeroAction(newHero: HeroModel) {
      store.setErrorAction("");
      store.loading = true;
      try {
        store.heroes.push((await postAxios(EndPoints.heroes, newHero)).data);
      } catch (e) {
        store.setErrorAction(e);
      }
      store.loading = false;
    },

    softDeleteHeroAction(id: string) {
      store.heroes = store.heroes.filter((h) => h.id !== id);
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
  }));

  return store;
};

export default HeroContext;
