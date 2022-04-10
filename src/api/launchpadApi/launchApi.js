import axios from 'axios';

const BASE_URL = `${process.env.VUE_APP_BE_BASE_URL}/api/launches`;

/**
 * Returns future launches and launches from last 24h
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getUpcoming = async () => {
  return axios.get(`${BASE_URL}/upcoming`);
};

/**
 * Returns past launches
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getPast = async () => {
  return axios.get(`${BASE_URL}/past`);
};
