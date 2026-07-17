import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

export const fetchInternships = () =>
  axios.get(`${API_BASE}/internships/`).then((res) => res.data);

export const createInternship = (formData) =>
  axios
    .post(`${API_BASE}/internships/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);

export const updateInternship = (id, formData) =>
  axios
    .patch(`${API_BASE}/internships/${id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);

export const deleteInternship = (id) =>
  axios.delete(`${API_BASE}/internships/${id}/`);