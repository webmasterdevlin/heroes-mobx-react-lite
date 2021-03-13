import React from "react";
import { EndPoints } from "axios/api-config";
import { deleteAxios, getAxios, postAxios } from "axios/generic-api-calls";
import { useLocalObservable } from "mobx-react-lite";

import { VillainModel, VillainStateType } from "./villainTypes";
import { runInAction } from "mobx";

const initialValues: VillainStateType = {
  villains: [] as VillainModel[],
  villain: {
    id: "",
    firstName: "",
    lastName: "",
    house: "",
    knownAs: "",
  } as VillainModel,
  loading: false,
  error: "",
};

/*
 * what is runInAction()?
 * https://stackoverflow.com/questions/57271153/mobx-runinaction-usage-why-do-we-need-it
 * */

const VillainContext = () => {
  const store = useLocalObservable(() => ({
    /*observables*/
    ...initialValues,

    /*non-asynchronous actions*/
    setVillainAction(villain: VillainModel) {
      store.villain = villain;
    },

    softDeleteVillainAction(villain: VillainModel) {
      store.villains = store.villains.filter((v) => v.id !== villain.id);
    },

    setErrorAction({ message }: any) {
      store.error = message;
    },

    /*computed values i.e. derived state*/
    get totalVillainsCount() {
      return store.villains.length;
    },

    /*asynchronous actions*/
    async getVillainsAction() {
      store.setErrorAction("");

      runInAction(() => {
        store.loading = true;
      });

      try {
        const { data } = await getAxios<VillainModel>(EndPoints.villains);
        runInAction(() => {
          store.villains = data;
        });
      } catch (e) {
        store.setErrorAction(e);
      }

      runInAction(() => {
        store.loading = false;
      });
    },

    // asynchronous actions also. Optimistic UI update. No need for showing loader/spinner.
    async deleteVillainAction(id: string) {
      store.setErrorAction("");
      const previousVillains = store.villains;
      store.villains = store.villains.filter((v) => v.id !== id);
      try {
        await deleteAxios(EndPoints.villains, id);
      } catch (e) {
        store.setErrorAction(e);
        store.villains = previousVillains;
      }
    },

    // asynchronous actions (pessimistic UI update)
    async postVillainAction(newVillain: VillainModel) {
      store.setErrorAction("");
      try {
        const { data } = await postAxios(EndPoints.villains, newVillain);
        runInAction(() => {
          store.villains.push(data);
        });
      } catch (e) {
        store.setErrorAction(e);
      }
    },
  }));

  return store;
};

export default VillainContext;
