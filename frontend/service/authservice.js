import { api } from "./axios";

export const loginUser = async (userdata) => {
  try {
    const response = await api.post("/login", userdata);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const registerUser = async (userdata) => {
  try {
    const response = await api.post("/register", userdata);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/logout");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchdata = async () => {
  try {
    const response = await api.get("/get-me");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};