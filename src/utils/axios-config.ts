import axios from "axios";

//TODO:
export const api = axios.create({
  baseURL: "http://localhost:5000/",
});
