import client from "./client";
import { API_ROUTES } from '../utils/constants';

const getNomarticles = () => client.get(API_ROUTES.NOMARTICLE);
const getNomarticle = (id) => client.get(`${API_ROUTES.NOMARTICLE}/${id}`);
const postNomarticle = (data) => client.post(API_ROUTES.NOMARTICLE, data);
const putNomarticle = (id, data) => client.put(`${API_ROUTES.NOMARTICLE}/${id}`, data);
const deleteNomarticle = (id) => client.delete(`${API_ROUTES.NOMARTICLE}/${id}`);

// export default exports = {
const exports = {
  getNomarticles,
  getNomarticle,
  postNomarticle,
  putNomarticle,
  deleteNomarticle
};

export default exports;