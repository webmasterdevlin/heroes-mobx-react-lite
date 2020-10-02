import http from "../shared/http-service";

import { Hero } from "./hero-types";
import { api, Endpoints } from "../utils/axios-config";

export async function getHeroes() {
  return await api.get<Hero[]>(Endpoints.heroes);
}

export async function getHeroById(id: string) {
  return await api.get<Hero>(`${Endpoints.heroes}${id}`);
}

export async function postHero(hero: Hero) {
  return await api.post<Hero>(Endpoints.heroes, hero);
}

export async function putHero(hero: Hero) {
  return await api.put<void>(`${Endpoints.heroes}${hero.id}`, hero);
}

export async function deleteHero(id: string) {
  return await api.delete<void>(`${Endpoints.heroes}${id}`);
}
