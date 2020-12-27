import { api, Endpoints } from "utils/axios-config";
import { HeroModel } from "./heroTypes";

export async function getHeroesAxios() {
  return await api.get<HeroModel[]>(Endpoints.heroes);
}

export async function deleteHeroAxios(id: string) {
  return await api.delete<void>(`${Endpoints.heroes}/${id}`);
}

export async function postHeroAxios(hero: HeroModel) {
  return await api.post<HeroModel>(Endpoints.heroes, hero);
}

export async function putHeroAxios(hero: HeroModel) {
  return await api.put<void>(`${Endpoints.heroes}/${hero.id}`, hero);
}
