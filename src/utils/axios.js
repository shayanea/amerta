import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const axiosInstance = axios.create({
  baseURL: 'http://45.82.137.69:8001',
  timeout: 10000,
});

axiosInstance.interceptors.request.use(async config => {
  const userToken = await AsyncStorage.getItem('@token');
  config.headers.Authorization = `Bearer ${userToken}`;
  return config;
});

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
      // store.dispatch({
      //   type: LOGOUT,
      //   payload: {
      //     isAuthenticated: false
      //   }
      // });
      // return history.push(`/login`);
    }
    return Promise.reject(error.response);
  },
);

export default axiosInstance;
