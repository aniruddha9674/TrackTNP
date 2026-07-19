// Utils/api/projectApi.js
import axios from "axios"; // or your existing http client

const BASE_URL = "http://localhost:8000/api/projects/";

export const getProjects = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const createProject = async (payload) => {
  const res = await axios.post(BASE_URL, payload);
  return res.data;
};

export const updateProject = async (id, payload) => {
  const res = await axios.put(`${BASE_URL}${id}/`, payload);
  return res.data;
};

export const deleteProject = async (id) => {
  await axios.delete(`${BASE_URL}${id}/`);
};