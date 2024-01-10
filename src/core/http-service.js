import axios from "axios";

const BASE_URL = "https://react-mini-projects-api.classbon.com";

export const httpService = axios.create({
  baseURL: BASE_URL,
});
