import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

export const fetchCertifications = () =>
  axios.get(`${API_BASE}/certifications/`).then((res) => res.data);

export const createCertification = (formData) =>
  axios
    .post(`${API_BASE}/certifications/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);

export const updateCertification = (id, formData) =>
  axios
    .patch(`${API_BASE}/certifications/${id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);

export const deleteCertification = (id) =>
  axios.delete(`${API_BASE}/certifications/${id}/`);