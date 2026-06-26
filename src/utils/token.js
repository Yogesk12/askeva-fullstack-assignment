import CryptoJS from "crypto-js";

const SECRET = "Empl0yEE_D@shb0@rd";

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const decodeToken = () => {
  try {
    const token = getToken();
    if (!token) return null;

    const bytes = CryptoJS.AES.decrypt(token, SECRET);
    const decoded = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return decoded;
  } catch (err) {
    return null;
  }
};

export const isAuthenticated = () => {
  return !!decodeToken();
};