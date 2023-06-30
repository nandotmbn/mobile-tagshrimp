import axios, {AxiosInstance} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from '../static/urls';

const MainApi = axiosInstance => {
  axiosInstance.interceptors.request.use(
    async config => {
      const token = await AsyncStorage.getItem('token');
      console.log(token)
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
      }
      config.headers['Content-Type'] = 'application/json';
      config.headers['Accept'] = 'application/json';
      config.headers['Accept-Language'] = 'id';
      config.headers['Access-Control-Allow-Origin'] = '*';

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

export default MainApi(
  axios.create({
    baseURL: baseURL,
  }),
);
