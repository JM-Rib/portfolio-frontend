import client from "./client";
import { API_ROUTES } from '../utils/constants';

const getDescriptions = () => client.get(API_ROUTES.DESCRIPTION);
const getDescription = (id) => client.get(`${API_ROUTES.DESCRIPTION}/${id}`);
const postDescription = (data) => client.post(API_ROUTES.DESCRIPTION, data);
const putDescription = (id, data) => client.put(`${API_ROUTES.DESCRIPTION}/${id}`, data);
const deleteDescription = (id) => client.delete(`${API_ROUTES.DESCRIPTION}/${id}`);

// export default exports = {
const exports = {
  getDescriptions,
  getDescription,
  postDescription,
  putDescription,
  deleteDescription
};

export default exports;