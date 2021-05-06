import axios from 'axios';

const BASE_URL = process.env.VUE_APP_BE_BASE_URL;

/**
 * @return {Promise<AxiosResponse<any>>}
 */
export const initializeCsrf = async () => {
  return axios.get(`${BASE_URL}/sanctum/csrf-cookie`, { withCredentials: true });
};

/**
 * Login into Launchpad API
 * @param {string} email
 * @param {string} password
 * @return {Promise<AxiosResponse<any>>}
 */
export const login = async (email, password) => {
  return axios.post(
    `${BASE_URL}/login`,
    {
      email,
      password,
    },
    {
      withCredentials: true,
      // headers: { 'X-XSRF-TOKEN': 'XSRF-TOKEN' },
    },
  );
};

/**
 * @returns{Promise<AxiosResponse<any>>}
 */
export const logout = async () => {
  return axios.post(
    `${BASE_URL}/logout`,
    {},
    {
      withCredentials: true,
      headers: { 'X-XSRF-TOKEN': 'XSRF-TOKEN' },
    },
  );
};

/**
 * Get authenticated user
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getUser = async () => {
  return axios.get(`${BASE_URL}/api/me`, {
    withCredentials: true,
    headers: { 'X-XSRF-TOKEN': 'XSRF-TOKEN' },
  });
};
