import React, { createContext } from "react";
import { useLocalStore } from "mobx-react-lite";
import {
  deleteVillain,
  getVillainById,
  getVillains,
  postVillain,
  putVillain,
} from "./villain-service";
import { Villain, VillainStateType, VillainStoreSchema } from "./villain-types";

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

export const VillainContextV2 = () => {
  const store = useLocalStore(() => ({
    /*observables*/
    ...initialValues,

    /*asynchronous actions*/
    async getVillains() {
      store.setError("");
      store.isLoading = true;
      try {
        store.villains = (await getVillains()).data;
      } catch (e) {
        store.setError(e);
      } finally {
        store.isLoading = false;
      }
    },
    async getVillainById(id: string) {
      store.setError("");
      store.isLoading = true;
      try {
        const { data } = await getVillainById(id);
        store.villain = data;
      } catch (e) {
        store.setError(e);
      } finally {
        store.isLoading = false;
      }
    },
    async postVillain(newVillain: Villain) {
      store.setError("");
      store.isLoading = true;
      try {
        store.villains.unshift((await postVillain(newVillain)).data);
      } catch (e) {
        store.setError(e);
      } finally {
        store.isLoading = false;
      }
    },

    // asynchronous actions also. Optimistic UI update. No need for showing loader/spinner.
    async deleteVillain(id: string) {
      store.setError("");
      const previousVillains = store.villains;
      store.villains = store.villains.filter((h) => h.id !== id);
      try {
        await deleteVillain(id);
      } catch (e) {
        store.villains = previousVillains;
        store.setError(e);
      }
    },
    async putVillain(updatedVillain: Villain) {
      store.setError("");
      store.isLoading = true;
      try {
        await putVillain(updatedVillain);
        const index = store.villains.findIndex(
          (v) => v.id === updatedVillain.id
        );
        store.villains[index] = updatedVillain;
      } catch (e) {
        store.setError(e);
      } finally {
        store.isLoading = false;
      }
    },
    /*non-asynchronous actions*/
    setVillain(villain: Villain) {
      store.villain = villain;
    },
    setError({ message }: any) {
      store.error = message;
      console.log(message);
    },

    /*computed values i.e. derived state*/
    get totalVillains() {
      return store.villains.length;
    },
  }));

  return store;
};
