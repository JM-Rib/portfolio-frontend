import client from "./client";
import { API_ROUTES } from '../utils/constants';

const getMedias = () => client.get(API_ROUTES.MEDIA);
const getMedia = (id) => client.get(`${API_ROUTES.MEDIA}/${id}`);
const postMedia = (data) => client.post(API_ROUTES.MEDIA, data);
const putMedia = (id, data) => client.put(`${API_ROUTES.MEDIA}/${id}`, data);
const deleteMedia = (id) => client.delete(`${API_ROUTES.MEDIA}/${id}`);

// export default exports = {
const exports = {
  getMedias,
  getMedia,
  postMedia,
  putMedia,
  deleteMedia
};

export default exports;