import client from "./client";
import { API_ROUTES } from '../utils/constants';

const getProjets = () => client.get(`${API_ROUTES.PROJET}/all&lang=1`);
const getProjet = (id) => client.get(`${API_ROUTES.PROJET}/info/${id}&lang=1`);
const postProjet = (data) => client.post(API_ROUTES.PROJET, data);
const putProjet = (id, data) => client.put(`${API_ROUTES.PROJET}/${id}`, data);
const deleteProjet = (id) => client.delete(`${API_ROUTES.PROJET}/${id}`);

// export default exports = {
const exports = {
  getProjets,
  getProjet,
  postProjet,
  putProjet,
  deleteProjet
};

export default exports;