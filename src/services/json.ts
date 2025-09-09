import axios from "axios";
export const json = axios.create({ baseURL: "https://jsonplaceholder.typicode.com" });