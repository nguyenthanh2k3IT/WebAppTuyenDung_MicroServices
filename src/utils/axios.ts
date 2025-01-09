import axios from 'axios';
import { getToken, removeTokens } from '@/helpers/storage.helper';

function getAxios(baseURL: string) {
    const ins = axios.create({
        baseURL,
    });
    ins.interceptors.request.use(function (config) {
        const accessToken = getToken();

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        config.headers['Content-Type'] = 'application/json';

        return config;
    });

    ins.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                removeTokens();
                window.location.href = '/auth/login';
            }
            return Promise.reject(error);
        },
    );

    return ins;
}

export const API = getAxios(`https://localhost:7000`);
