import CryptoJS from "crypto-js";

const SECRET = process.env.REACT_APP_SESSION_SECRET;

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
    if (!SECRET) return null;

    const token = getToken();
    if (!token) return null;

    const bytes = CryptoJS.AES.decrypt(token, SECRET);
    const decoded = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return decoded;
  } catch (err) {
    return null;
  }
};

export const createSessionToken = (user) => {
  if (!SECRET) {
    throw new Error("Missing REACT_APP_SESSION_SECRET");
  }

  return CryptoJS.AES.encrypt(
    JSON.stringify({
      id: user.id,
      email: user.Email,
      time: Date.now(),
    }),
    SECRET
  ).toString();
};

export const isAuthenticated = () => {
  return !!decodeToken();
};
