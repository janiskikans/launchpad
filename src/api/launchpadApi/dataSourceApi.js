import axios from 'axios';

const BASE_URL = `${process.env.VUE_APP_BE_BASE_URL}/api`;

/**
 * Returns future launches and launches from last 24h
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getSources = async () => {
  return axios.get(`${BASE_URL}/sources`);
};
