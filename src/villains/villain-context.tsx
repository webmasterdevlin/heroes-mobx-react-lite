import React from "react";
import { useLocalObservable } from "mobx-react-lite";

import { VillainModel, VillainStateType } from "./villain-types";
import {
  deleteVillainAxios,
  getVillainByIdAxios,
  getVillainsAxios,
  postVillainAxios,
  putVillainAxios,
} from "./villain-service";

const initialValues: VillainStateType = {
  villains: [],
  villain: {
    id: "",
    firstName: "",
    lastName: "",
    house: "",
    knownAs: "",
  },
  isLoading: false,
  error: "",
};

const VillainContext = () => {
  const store = useLocalObservable(() => ({
    /*observables*/
    ...initialValues,

    /*non-asynchronous actions*/
    setVillainAction(villain: VillainModel) {
      store.villain = villain;
    },

    setErrorAction({ message }: any) {
      store.error = message;
    },

    /*computed values i.e. derived state*/
    get totalVillainsAction() {
      return store.villains.length;
    },

    /*asynchronous actions*/
    async getVillainsAction() {
      store.setErrorAction("");
      store.isLoading = true;
      try {
        store.villains = (await getVillainsAxios()).data;
      } catch (e) {
        store.setErrorAction(e);
      }
      store.isLoading = false;
    },
    async getVillainByIdAction(id: string) {
      store.setErrorAction("");
      store.isLoading = true;
      try {
        const { data } = await getVillainByIdAxios(id);
        store.villain = data;
      } catch (e) {
        store.setErrorAction(e);
      }
      store.isLoading = false;
    },

    // asynchronous actions (pessimistic UI update)
    async postVillainAction(newVillain: VillainModel) {
      store.setErrorAction("");
      store.isLoading = true;
      try {
        store.villains.post((await postVillainAxios(newVillain)).data);
      } catch (e) {
        store.setErrorAction(e);
      }
      store.isLoading = false;
    },

    // asynchronous actions also. Optimistic UI update. No need for showing loader/spinner.
    async deleteVillainAction(id: string) {
      store.setErrorAction("");
      const previousVillains = store.villains;
      store.villains = store.villains.filter((h) => h.id !== id);
      try {
        await deleteVillainAxios(id);
      } catch (e) {
        store.setErrorAction(e);
        store.villains = previousVillains;
      }
    },
    async putVillainAction(updatedVillain: VillainModel) {
      store.setErrorAction("");
      const index = store.villains.findIndex((v) => v.id === updatedVillain.id);
      store.villains[index] = updatedVillain;
      const previousVillains = store.villains;
      try {
        await putVillainAxios(updatedVillain);
      } catch (e) {
        store.setErrorAction(e);
        store.villains = previousVillains;
      }
    },
  }));

  return store;
};

export default VillainContext;
