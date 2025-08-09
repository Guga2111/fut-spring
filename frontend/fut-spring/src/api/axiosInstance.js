import axios from 'axios';
import {toast} from 'sonner';
import { API_BASE_URL } from '../config';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 100000,
    headers: {
        'Content-Type' : 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt_token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        console.error('Error on the response interceptor', error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('Error on the response interceptor', error);

        if (error.response) {
            const {status, data} = error.response;

            switch (status) {
                case 401:
                    toast.error("Session expired. Please, log in again.");
                    localStorage.removeItem("jwt_token");
                    break;
                case 403:
                    
                    break;
                case 404:
                    toast.error(data.error || "Resource don't found.");
                    break;
                case 400:
                case 422:
                    toast.error(data.error || "Invalid data. Verify your info.");
                    break;
                case 500:
                    toast.error("Ocurred an error in the server. Try again later.");
                    break;
                default:
                    toast.error(data.error || `Unknown error: ${status}`);
                    break;
            }
        } else if (error.request) {
            console.error("Error retry your connection");
        } else {
            toast.error("Error when configuring the request");
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;