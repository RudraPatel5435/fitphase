import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/user",
});

export const saveUserData = async (username, data) => {
  try {
    const res = await API.post("/save", { username, data });
    console.log("Save successful:", res.data);
  } catch (err) {
    console.error("Error saving data:", err);
  }
};
export const getUserData = (username) =>
  API.post("/get", { username }).then((res) => res.data);
