import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
    // config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;

    return config;
});

axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
        },async (error) => {
        // Handle errors
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry)
        {
            
            originalRequest._retry = true;
            delete axios.defaults.headers.common['Authorization'];
            // axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;
            // localStorage.setItem('accessToken', data.accessToken);
            // localStorage.setItem('refreshToken', data.refreshToken);
            
            return axiosClient(originalRequest);

        }
        throw error;
    }
);


export default axiosClient;