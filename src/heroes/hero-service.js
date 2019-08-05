import http from "../shared/http-service";
import { BaseUrl } from "../api-config";

export async function getHeroes() {
  return await http.get(BaseUrl.heroes);
}

export async function getHeroById(id) {
  return await http.get(`${BaseUrl.heroes}${id}`);
}

export async function postHero(hero) {
  return await http.post(BaseUrl.heroes, hero);
}

export async function putHero(hero) {
  return await http.put(`${BaseUrl.heroes}${hero.id}`, hero);
}

export async function deleteHero(id) {
  return await http.delete(`${BaseUrl.heroes}${id}`);
}
