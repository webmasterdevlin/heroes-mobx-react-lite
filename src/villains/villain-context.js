import React, { createContext } from "react";
import { useLocalStore } from "mobx-react-lite";
import {
  deleteVillain,
  getVillainById,
  getVillains,
  postVillain,
  putVillain
} from "./villain-service";

export const villainContext = createContext();

export const VillainProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    villains: [],
    villain: {
      id: "",
      firstName: "",
      lastName: "",
      house: "",
      knownAs: ""
    },
    isLoading: false,
    error: "",
    /*actions*/
    async getVillains() {
      store.isLoading = true;
      try {
        store.villains = (await getVillains()).data;
      } catch (e) {
        store.setError(e);
      }
      store.isLoading = false;
    },
    async getVillainById(id) {
      store.isLoading = true;
      try {
        const { data } = await getVillainById(id);
        store.villain = data;
      } catch (e) {
        store.setError(e);
      }
      store.isLoading = false;
    },
    async postVillain(newVillain) {
      store.isLoading = true;
      try {
        store.villains.unshift((await postVillain(newVillain)).data);
      } catch (e) {
        store.setError(e);
      }
      store.isLoading = false;
    },
    // optimistic UI update. No need for showing loader/spinner.
    async deleteVillain(id) {
      const previousVillains = store.villains;
      store.villains = store.villains.filter(h => h.id !== id);
      try {
        await deleteVillain(id);
      } catch (e) {
        store.villains = previousVillains;
        store.setError(e);
      }
    },
    async putVillain(updatedVillain) {
      store.isLoading = true;
      try {
        await putVillain(updatedVillain);
        const index = store.villains.findIndex(v => v.id === updatedVillain.id);
        store.villains[index] = updatedVillain;
      } catch (e) {
        store.setError(e);
      }
      store.isLoading = false;
    },
    setVillain(villain) {
      store.villain = villain;
    },
    setError({ message }) {
      store.error = message;
      alert(message);
    },
    /*computed values i.e. derived state*/
    get totalVillains() {
      return store.villains.length;
    }
  }));

  return (
    <villainContext.Provider value={store}>{children}</villainContext.Provider>
  );
};
