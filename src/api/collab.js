import client from "./client";
import { API_ROUTES } from '../utils/constants';

const getCollabs = () => client.get(API_ROUTES.COLLAB);
const getCollab = (id) => client.get(`${API_ROUTES.COLLAB}/${id}`);
const postCollab = (data) => client.post(API_ROUTES.COLLAB, data);
const putCollab = (id, data) => client.put(`${API_ROUTES.COLLAB}/${id}`, data);
const deleteCollab = (id) => client.delete(`${API_ROUTES.COLLAB}/${id}`);

// export default exports = {
const exports = {
  getCollabs,
  getCollab,
  postCollab,
  putCollab,
  deleteCollab
};

export default exports;