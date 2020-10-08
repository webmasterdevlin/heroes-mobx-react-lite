import { Hero } from "./hero-types";
import { api, Endpoints } from "../utils/axios-config";

export async function getHeroesAxios() {
  return await api.get<Hero[]>(Endpoints.heroes);
}

export async function getHeroByIdAxios(id: string) {
  return await api.get<Hero>(`${Endpoints.heroes}${id}`);
}

export async function postHeroAxios(hero: Hero) {
  return await api.post<Hero>(Endpoints.heroes, hero);
}

export async function putHeroAxios(hero: Hero) {
  return await api.put<void>(`${Endpoints.heroes}${hero.id}`, hero);
}

export async function deleteHeroAxios(id: string) {
  return await api.delete<void>(`${Endpoints.heroes}${id}`);
}
