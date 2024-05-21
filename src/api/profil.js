import client from "./client";
import { API_ROUTES } from '../utils/constants';

const getProfils = () => client.get(API_ROUTES.PROFIL);
const getProfil = (id) => client.get(`${API_ROUTES.PROFIL}/${id}`);
const postProfil = (data) => client.post(API_ROUTES.PROFIL, data);
const putProfil = (id, data) => client.put(`${API_ROUTES.PROFIL}/${id}`, data);
const deleteProfil = (id) => client.delete(`${API_ROUTES.PROFIL}/${id}`);

// export default exports = {
const exports = {
  getProfils,
  getProfil,
  postProfil,
  putProfil,
  deleteProfil
};

export default exports;