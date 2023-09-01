import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const request = async ({ ...options }: AxiosRequestConfig) => {
  const tokenString = localStorage.getItem('token');
  const token = tokenString ? JSON.stringify(tokenString) : null;

  if (token)
    client.defaults.headers.common.Authorization = `Bearer ${JSON.parse(
      token
    )}`;

  const onSuccess = (response: AxiosResponse) => {
    return response.data;
  };
  const onError = (error: AxiosError) => {
    throw error.response?.data;
  };

  return client(options).then(onSuccess).catch(onError);
};
