import axios, {AxiosInstance} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL, dnnURL } from '../static/urls';

const UploadApi = axiosInstance => {
  axiosInstance.interceptors.request.use(
    async config => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
      }
      config.headers['Content-Type'] = 'multipart/form-data';

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );
  axiosInstance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (
        error.toString() === 'Error: Network Error' ||
        error.toString() === 'AxiosError: Network Error'
      ) {
        return {
          code: 500,
          message: 'Masalah jaringan',
        };
      }
      return error.response;
    },
  );

  return axiosInstance;
};

export default UploadApi(
  axios.create({
    baseURL: dnnURL,
  }),
);
