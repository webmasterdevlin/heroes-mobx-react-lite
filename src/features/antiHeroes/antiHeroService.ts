import { api, Endpoints } from "api/axios-config";
import { AntiHeroModel } from "./antiHeroTypes";

export async function getAntiHeroesAxios() {
  return await api.get<AntiHeroModel[]>(Endpoints.antiHeroes);
}

export async function deleteAntiHeroAxios(id: string) {
  return await api.delete<void>(`${Endpoints.antiHeroes}/${id}`);
}

export async function postAntiHeroAxios(antiHero: AntiHeroModel) {
  return await api.post<AntiHeroModel>(Endpoints.antiHeroes, antiHero);
}

export async function putAntiHeroAxios(antiHero: AntiHeroModel) {
  return await api.put<void>(
    `${Endpoints.antiHeroes}/${antiHero.id}`,
    antiHero
  );
}
