import { api, Endpoints } from "../utils/axios-config";
import { Villain } from "./villain-types";

export async function getVillains() {
  return await api.get(Endpoints.villains);
}

export async function getVillainById(id: string) {
  return await api.get(`${Endpoints.villains}${id}`);
}

export async function postVillain(villain: Villain) {
  return await api.post(Endpoints.villains, villain);
}

export async function putVillain(villain: Villain) {
  return await api.put(`${Endpoints.villains}${villain.id}`, villain);
}

export async function deleteVillain(id: string) {
  return await api.delete(`${Endpoints.villains}${id}`);
}
