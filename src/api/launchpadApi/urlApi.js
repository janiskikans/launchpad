import axios from 'axios';

const BASE_URL = `${process.env.VUE_APP_BE_BASE_URL}/api/urls`;

/**
 * Returns paginated external URLs
 * @return {Promise<AxiosResponse<any>>}
 */
export const getUrls = async () => {
  return axios.get(BASE_URL);
};

/**
 * Create a new link
 * @param {{}} linkData 
 * @return {Promise<AxiosResponse<any>>}
 */
export const createUrl = async (linkData) => {
  return axios.post(BASE_URL, linkData,  { withCredentials: true });
};
