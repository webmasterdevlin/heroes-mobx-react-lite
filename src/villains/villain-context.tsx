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

export const VillainProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    /*observables*/
    ...initialValues,

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
    async getVillainById(id: string) {
      store.isLoading = true;
      try {
        const { data } = await getVillainById(id);
        store.villain = data;
      } catch (e) {
        store.setError(e);
      }
      store.isLoading = false;
    },
    async postVillain(newVillain: Villain) {
      store.isLoading = true;
      try {
        store.villains.unshift((await postVillain(newVillain)).data);
      } catch (e) {
        store.setError(e);
      }
      store.isLoading = false;
    },

    // optimistic UI update. No need for showing loader/spinner.
    async deleteVillain(id: string) {
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
      store.isLoading = true;
      try {
        await putVillain(updatedVillain);
        const index = store.villains.findIndex(
          (v) => v.id === updatedVillain.id
        );
        store.villains[index] = updatedVillain;
      } catch (e) {
        store.setError(e);
      }
      store.isLoading = false;
    },
    setVillain(villain: Villain) {
      store.villain = villain;
    },
    setError({ message }: any) {
      store.error = message;
      alert(message);
    },

    /*computed values i.e. derived state*/
    get totalVillains() {
      return store.villains.length;
    },
  }));

  return (
    <villainContext.Provider value={store}>{children}</villainContext.Provider>
  );
};
export const villainContext = createContext<VillainStoreSchema>(null);
