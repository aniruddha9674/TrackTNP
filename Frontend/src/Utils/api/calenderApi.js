import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

export const fetchEvents = () =>
  axios.get(`${API_BASE}/events/`).then((res) => res.data);

export const createEvent = (data) =>
  axios.post(`${API_BASE}/events/`, data).then((res) => res.data);

export const deleteEvent = (id) =>
  axios.delete(`${API_BASE}/events/${id}/`);