import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/user",
});

export const saveUserData = (userId, data) =>
  API.post("/save", { userId, data });

export const getUserData = (userId) =>
  API.post("/get", { userId }).then((res) => res.data);
