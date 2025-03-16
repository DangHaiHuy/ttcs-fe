import { useEffect, useRef } from 'react';
import { ACCESS_TOKEN, getToken, REFRESH_TOKEN, removeToken, setToken } from '../services/tokenService';
import { useNavigate } from 'react-router-dom';
import useAuthenService from '../services/authenService';
import { toast } from 'react-toastify';
import axios from 'axios';
// import { httpRequestPrivate } from '../utils/httpRequest';

const useHttpPrivate = () => {
    const accessToken = getToken(ACCESS_TOKEN);
    const navigate = useNavigate();
    const { refreshToken } = useAuthenService();
    const httpRequestPrivate = useRef(
        axios.create({
            baseURL: import.meta.env.VITE_API_URL,
        }),
    );

    useEffect(() => {
        // console.log(123);
        const instance = httpRequestPrivate.current;
        const requestIntercept = instance.interceptors.request.use(
            (config) => {
                if (!config.headers.Authorization) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error),
        );

        const responseIntercept = instance.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                const code = error?.response?.data?.code;
                const originalRequest = error.config;

                if (code === 1011) {
                    removeToken(ACCESS_TOKEN);
                    toast.error(error?.response?.data?.errMessage || error?.response?.data?.message || 'Có lỗi xảy ra');
                    navigate('/activate');
                } else if (code === 1006 && !originalRequest._retry) {
                    removeToken(ACCESS_TOKEN);
                    originalRequest._retry = true;
                    const result = await refreshToken({ token: getToken(REFRESH_TOKEN) || '' });
                    if (result.code === 1006 || result.code === 1014) {
                        removeToken(REFRESH_TOKEN);
                        navigate('/login');
                    } else if (result.code === 1000) {
                        setToken(ACCESS_TOKEN, result.result.accessToken);
                        setToken(REFRESH_TOKEN, result.result.refreshToken);
                        originalRequest.headers.Authorization = `Bearer ${result.result.accessToken}`;
                        return instance(originalRequest);
                    } else {
                        toast.error(
                            error?.response?.data?.errMessage || error?.response?.data?.message || 'Có lỗi xảy ra',
                        );
                    }
                } else if (code === 1007) {
                    toast.error(error?.response?.data?.errMessage || error?.response?.data?.message || 'Có lỗi xảy ra');
                    navigate('');
                } else if (code === 1014) {
                    toast.error(error?.response?.data?.errMessage || error?.response?.data?.message || 'Có lỗi xảy ra');
                    navigate('/login');
                } else
                    toast.error(error?.response?.data?.errMessage || error?.response?.data?.message || 'Có lỗi xảy ra');
                return Promise.reject(error);
            },
        );
        return () => {
            instance.interceptors.request.eject(requestIntercept);
            instance.interceptors.response.eject(responseIntercept);
        };
    }, [accessToken]);

    return httpRequestPrivate.current;
};
export default useHttpPrivate;
