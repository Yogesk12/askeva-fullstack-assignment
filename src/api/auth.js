import axios from "axios";
import { createSessionToken } from "../utils/token";

export const loginUser = async (data) => {
  const url = `https://6819d8771ac115563506b0bc.mockapi.io/api/Employees?Email=${data.email}&Password=${data.password}`;

  const response = await axios.get(url);
  const users = response.data;

  if (!users || users.length === 0) {
    throw new Error("Invalid credentials");
  }

  const user = users[0];

  const sessionToken = createSessionToken(user);

  return { token: sessionToken };
};

export const getEmployees = async (data) => {
  const url = `https://6819d8771ac115563506b0bc.mockapi.io/api/Employees`;

  const response = await axios.get(url);
  const users = response.data;

  if (!users || users.length === 0) {
    throw new Error("Invalid credentials");
  }


  return users;
};


