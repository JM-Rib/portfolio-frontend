import client from "./client";
import { API_ROUTES } from '../utils/constants';

const getLangues = () => client.get(API_ROUTES.LANGUE);
const getLangue = (id) => client.get(`${API_ROUTES.LANGUE}/${id}`);
const postLangue = (data) => client.post(API_ROUTES.LANGUE, data);
const putLangue = (id, data) => client.put(`${API_ROUTES.LANGUE}/${id}`, data);
const deleteLangue = (id) => client.delete(`${API_ROUTES.LANGUE}/${id}`);

// export default exports = {
const exports = {
  getLangues,
  getLangue,
  postLangue,
  putLangue,
  deleteLangue
};

export default exports;