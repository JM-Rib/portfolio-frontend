import client from "./client";
import { API_ROUTES } from '../utils/constants';

const getArticles = () => client.get(API_ROUTES.ARTICLE);
const getArticle = (id) => client.get(`${API_ROUTES.ARTICLE}/${id}`);
const postArticle = (data) => client.post(API_ROUTES.ARTICLE, data);
const putArticle = (id, data) => client.put(`${API_ROUTES.ARTICLE}/${id}`, data);
const deleteArticle = (id) => client.delete(`${API_ROUTES.ARTICLE}/${id}`);

// export default exports = {
const exports = {
  getArticles,
  getArticle,
  postArticle,
  putArticle,
  deleteArticle
};

export default exports;