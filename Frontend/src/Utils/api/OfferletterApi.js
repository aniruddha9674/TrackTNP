import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

export const fetchOfferLetters = () =>
  axios.get(`${API_BASE}/offer-letters/`).then((res) => res.data);

export const createOfferLetter = (formData) =>
  axios
    .post(`${API_BASE}/offer-letters/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);

export const updateOfferLetter = (id, formData) =>
  axios
    .patch(`${API_BASE}/offer-letters/${id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);

export const deleteOfferLetter = (id) =>
  axios.delete(`${API_BASE}/offer-letters/${id}/`);