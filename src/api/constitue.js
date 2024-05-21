import client from "./client";
import { API_ROUTES } from '../utils/constants';

const getConstitues = () => client.get(API_ROUTES.CONSTITUE);
const getConstitue = (id) => client.get(`${API_ROUTES.CONSTITUE}/${id}`);
const postConstitue = (data) => client.post(API_ROUTES.CONSTITUE, data);
const putConstitue = (id, data) => client.put(`${API_ROUTES.CONSTITUE}/${id}`, data);
const deleteConstitue = (id) => client.delete(`${API_ROUTES.CONSTITUE}/${id}`);

// export default exports = {
const exports = {
  getConstitues,
  getConstitue,
  postConstitue,
  putConstitue,
  deleteConstitue
};

export default exports;