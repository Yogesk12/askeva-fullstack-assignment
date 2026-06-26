import axios from "axios";

const API_URL =
  "https://6819d8771ac115563506b0bc.mockapi.io/api/Employees";

// GET employees
export const getEmployees = () => {
  return axios.get(API_URL);
};

// ADD employee
export const addEmployee = (data) => {
  return axios.post(API_URL, data);
};

// UPDATE employee
export const updateEmployee = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

// DELETE employee
export const deleteEmployee = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};