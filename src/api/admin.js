import client from "./client";
import { API_ROUTES } from '../utils/constants';

const getAdmins = () => client.get(API_ROUTES.ADMIN);
const getAdmin = (id) => client.get(`${API_ROUTES.ADMIN}/${id}`);
const postAdmin = (data) => client.post(API_ROUTES.ADMIN, data);
const putAdmin = (id, data) => client.put(`${API_ROUTES.ADMIN}/${id}`, data);
const deleteAdmin = (id) => client.delete(`${API_ROUTES.ADMIN}/${id}`);
const verifyAdmin = (token) => client.get(API_ROUTES.VERIFY, {headers: {'Authorization': `Bearer ${token}`}});
const loginAdmin = (data) => client.post(API_ROUTES.LOGIN, data);

// export default exports = {
const exports = {
  getAdmins,
  getAdmin,
  postAdmin,
  putAdmin,
  deleteAdmin,
  verifyAdmin,
  loginAdmin
};

export default exports;