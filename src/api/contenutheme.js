import client from "./client";
import { API_ROUTES } from '../utils/constants';

const getContenuthemes = () => client.get(API_ROUTES.CONTENUTHEME);
const getContenutheme = (id) => client.get(`${API_ROUTES.CONTENUTHEME}/${id}`);
const postContenutheme = (data) => client.post(API_ROUTES.CONTENUTHEME, data);
const putContenutheme = (id, data) => client.put(`${API_ROUTES.CONTENUTHEME}/${id}`, data);
const deleteContenutheme = (id) => client.delete(`${API_ROUTES.CONTENUTHEME}/${id}`);

// export default exports = {
const exports = {
  getContenuthemes,
  getContenutheme,
  postContenutheme,
  putContenutheme,
  deleteContenutheme
};

export default exports;