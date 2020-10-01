import http from "../shared/http-service";
import { BaseUrl } from "../api-config";
import { Hero } from "./hero-types";

export async function getHeroes() {
  return await http.get<Hero[]>(BaseUrl.heroes);
}

export async function getHeroById(id) {
  return await http.get<Hero>(`${BaseUrl.heroes}${id}`);
}

export async function postHero(hero) {
  return await http.post<Hero>(BaseUrl.heroes, hero);
}

export async function putHero(hero) {
  return await http.put<void>(`${BaseUrl.heroes}${hero.id}`, hero);
}

export async function deleteHero(id) {
  return await http.delete<void>(`${BaseUrl.heroes}${id}`);
}
