import axios from 'axios';

const BASE_URL = 'https://ll.thespacedevs.com/2.0.0/launch';

/**
 * API endpoint that returns future Launch objects and launches from the last twenty four hours
 * @link /2.0.0/launch/upcoming
 * @return {Promise<AxiosResponse<any>>}
 */
export const getUpcoming = async () => {
  return axios.get(`${BASE_URL}/upcoming`);
};
