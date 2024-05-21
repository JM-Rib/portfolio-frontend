import client from "./client";
import { API_ROUTES } from '../utils/constants';

const getParagraphes = () => client.get(API_ROUTES.PARAGRAPHE);
const getParagraphe = (id) => client.get(`${API_ROUTES.PARAGRAPHE}/${id}`);
const postParagraphe = (data) => client.post(API_ROUTES.PARAGRAPHE, data);
const putParagraphe = (id, data) => client.put(`${API_ROUTES.PARAGRAPHE}/${id}`, data);
const deleteParagraphe = (id) => client.delete(`${API_ROUTES.PARAGRAPHE}/${id}`);

// export default exports = {
const exports = {
  getParagraphes,
  getParagraphe,
  postParagraphe,
  putParagraphe,
  deleteParagraphe
};

export default exports;