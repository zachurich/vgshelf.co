import axios from 'axios';

import { API_ROUTES } from '../common/routes';

export const fetchCheckSession = async () => {
  const { data: response } = await axios.get(API_ROUTES.AUTH);
  return response.data;
};
