import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000"
});

// Get user by email
export const getUserByEmail = async (email) => {
  const response = await API.get("/users", {
    params: { email }
  });

  return response.data;
};

// Get user by ID
export const getUserById = async (id) => {
  const response = await API.get(`/users/${id}`);

  return response.data;
};

// Register user
export const createUser = async (userData) => {
  const response = await API.post("/users", userData);

  return response.data;
};

// Check username
export const getUserByUsername = async (username) => {
  const response = await API.get("/users", {
    params: { username }
  });

  return response.data;
};