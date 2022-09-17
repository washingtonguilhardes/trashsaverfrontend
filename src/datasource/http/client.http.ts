import axios from 'axios';

export const browserHttpClient = axios.create({
  baseURL: '/api/datasource',
});
