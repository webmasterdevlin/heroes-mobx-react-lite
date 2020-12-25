import { api, Endpoints } from "../utils/axios-config";
import { VillainModel } from "./villain-types";

export async function getVillainsAxios() {
  return await api.get<VillainModel[]>(Endpoints.villains);
}

export async function getVillainByIdAxios(id: string) {
  return await api.get<VillainModel>(`${Endpoints.villains}/${id}`);
}

export async function postVillainAxios(villain: VillainModel) {
  return await api.post<VillainModel>(Endpoints.villains, villain);
}

export async function putVillainAxios(villain: VillainModel) {
  return await api.put<void>(`${Endpoints.villains}/${villain.id}`, villain);
}

export async function deleteVillainAxios(id: string) {
  return await api.delete<void>(`${Endpoints.villains}/${id}`);
}
