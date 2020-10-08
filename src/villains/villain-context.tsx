import React from "react";
import { useLocalObservable } from "mobx-react-lite";
import {
  deleteVillainAxios,
  getVillainByIdAxios,
  getVillainsAxios,
  postVillainAxios,
  putVillainAxios,
} from "./villain-service";
import { Villain, VillainStateType } from "./villain-types";

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
    setVillainAction(villain: Villain) {
      store.villain = villain;
    },
    setErrorAction({ message }: any) {
      store.error = message;
      console.log(message);
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
      } finally {
        store.isLoading = false;
      }
    },
    async getVillainByIdAction(id: string) {
      store.setErrorAction("");
      store.isLoading = true;
      try {
        const { data } = await getVillainByIdAxios(id);
        store.villain = data;
      } catch (e) {
        store.setErrorAction(e);
      } finally {
        store.isLoading = false;
      }
    },
    async postVillainAction(newVillain: Villain) {
      store.setErrorAction("");
      store.isLoading = true;
      try {
        store.villains.unshift((await postVillainAxios(newVillain)).data);
      } catch (e) {
        store.setErrorAction(e);
      } finally {
        store.isLoading = false;
      }
    },

    // asynchronous actions also. Optimistic UI update. No need for showing loader/spinner.
    async deleteVillainAction(id: string) {
      store.setErrorAction("");
      const previousVillains = store.villains;
      store.villains = store.villains.filter((h) => h.id !== id);
      try {
        await deleteVillainAxios(id);
      } catch (e) {
        store.villains = previousVillains;
        store.setErrorAction(e);
      }
    },
    async putVillainAction(updatedVillain: Villain) {
      store.setErrorAction("");
      store.isLoading = true;
      try {
        await putVillainAxios(updatedVillain);
        const index = store.villains.findIndex(
          (v) => v.id === updatedVillain.id
        );
        store.villains[index] = updatedVillain;
      } catch (e) {
        store.setErrorAction(e);
      } finally {
        store.isLoading = false;
      }
    },
  }));

  return store;
};

export default VillainContext;
