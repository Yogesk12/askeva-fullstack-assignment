import axios from "axios";
import CryptoJS from "crypto-js";

const SECRET = "Empl0yEE_D@shb0@rd";

export const loginUser = async (data) => {
  const url = `https://6819d8771ac115563506b0bc.mockapi.io/api/Employees?Email=${data.email}&Password=${data.password}`;

  const response = await axios.get(url);
  const users = response.data;

  if (!users || users.length === 0) {
    throw new Error("Invalid credentials");
  }

  const user = users[0];

  const sessionToken = CryptoJS.AES.encrypt(
    JSON.stringify({
      id: user.id,
      email: user.Email,
      time: Date.now(),
    }),
    SECRET
  ).toString();

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


