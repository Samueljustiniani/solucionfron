import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";

export const getFicha = () => axios.get(`${API_URL}/FICHAS`);
export const createFicha = (ficha) => axios.post(`${API_URL}/FICHAS`, ficha);
export const deleteFicha = (id) => axios.delete(`${API_URL}/FICHAS/${id}`)