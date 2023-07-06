import axios from "axios";

const BASE_URL = "https://fakestoreapi.com"; // Ganti dengan URL API yang sesuai

const Api = axios.create({
  baseURL: BASE_URL,
});

export const getItems = () => {
  return Api.get("/products");
};

export const getItem = (id) => {
  return Api.get(`/products/${id}`);
};

export const createItem = (data) => {
  return Api.post("/products", data);
};

export const updateItem = (id, data) => {
  return Api.put(`/products/${id}`, data);
};

export const deleteItem = (id) => {
  return Api.delete(`/products/${id}`);
};
