import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

export const fetchVolunteers = () =>
  axios.get(`${API_BASE}/volunteers/`).then((res) => res.data);

export const fetchVolunteerById = (id) =>
  axios.get(`${API_BASE}/volunteers/${id}/`).then((res) => res.data);

export const createVolunteer = (data) =>
  axios.post(`${API_BASE}/volunteers/`, data).then((res) => res.data);

export const updateVolunteer = (id, data) =>
  axios.patch(`${API_BASE}/volunteers/${id}/`, data).then((res) => res.data);

export const deleteVolunteer = (id) =>
  axios.delete(`${API_BASE}/volunteers/${id}/`);

export const fetchStaff = () =>
  axios.get(`${API_BASE}/staff/`).then((res) => res.data);

export const createStaff = (data) =>
  axios.post(`${API_BASE}/staff/`, data).then((res) => res.data);

export const updateStaff = (id, data) =>
  axios.patch(`${API_BASE}/staff/${id}/`, data).then((res) => res.data);

export const deleteStaff = (id) =>
  axios.delete(`${API_BASE}/staff/${id}/`);