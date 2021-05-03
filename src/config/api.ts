import { isDev } from '@/utils/is';
import { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  timeout: 1000 * 60,
  baseURL: isDev ? process.env.VUE_APP_API_DEV : process.env.VUE_APP_API_PROD,
  withCredentials: true,
};

export default config;
