import client from "./client";
import { API_ROUTES } from '../utils/constants';

const getThemes = () => client.get(API_ROUTES.THEME);
const getTheme = (id) => client.get(`${API_ROUTES.THEME}/${id}`);
const postTheme = (data) => client.post(API_ROUTES.THEME, data);
const putTheme = (id, data) => client.put(`${API_ROUTES.THEME}/${id}`, data);
const deleteTheme = (id) => client.delete(`${API_ROUTES.THEME}/${id}`);

// export default exports = {
const exports = {
  getThemes,
  getTheme,
  postTheme,
  putTheme,
  deleteTheme
};

export default exports;