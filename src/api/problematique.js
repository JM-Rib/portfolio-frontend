import client from "./client";
import { API_ROUTES } from '../utils/constants';

const getProblematiques = () => client.get(API_ROUTES.PROBLEMATIQUE);
const getProblematique = (id) => client.get(`${API_ROUTES.PROBLEMATIQUE}/${id}`);
const postProblematique = (data) => client.post(API_ROUTES.PROBLEMATIQUE, data);
const putProblematique = (id, data) => client.put(`${API_ROUTES.PROBLEMATIQUE}/${id}`, data);
const deleteProblematique = (id) => client.delete(`${API_ROUTES.PROBLEMATIQUE}/${id}`);

// export default exports = {
const exports = {
  getProblematiques,
  getProblematique,
  postProblematique,
  putProblematique,
  deleteProblematique
};

export default exports;