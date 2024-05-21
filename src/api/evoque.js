import client from "./client";
import { API_ROUTES } from '../utils/constants';

const getEvoques = () => client.get(API_ROUTES.EVOQUE);
const getEvoque = (id) => client.get(`${API_ROUTES.EVOQUE}/${id}`);
const postEvoque = (data) => client.post(API_ROUTES.EVOQUE, data);
const putEvoque = (id, data) => client.put(`${API_ROUTES.EVOQUE}/${id}`, data);
const deleteEvoque = (id) => client.delete(`${API_ROUTES.EVOQUE}/${id}`);

// export default exports = {
const exports = {
  getEvoques,
  getEvoque,
  postEvoque,
  putEvoque,
  deleteEvoque
};

export default exports;