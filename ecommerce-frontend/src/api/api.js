import axios from "axios";
import { TOKENS } from "../config/tokens";

const API = axios.create({
    baseURL: "http://localhost:5000/api"
});

// default role = USER
let currentToken = TOKENS.USER;

export const setAdmin = () => {
    currentToken = TOKENS.ADMIN;
};

export const setUser = () => {
    currentToken = TOKENS.USER;
};

API.interceptors.request.use((config) => {

    if (currentToken) {
    config.headers.Authorization = `Bearer ${currentToken}`;
  }

    return config;
});

export default API;