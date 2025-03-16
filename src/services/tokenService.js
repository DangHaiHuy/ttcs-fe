import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';

export const setToken = (key, token) => {
    const decoded = jwtDecode(token);
    const expireTimeInSeconds = decoded.exp;

    const expireDate = new Date(expireTimeInSeconds * 1000);
    Cookies.set(key, token, { expires: expireDate });
};

export const getToken = (key) => {
    return Cookies.get(key);
};

export const removeToken = (key) => {
    return Cookies.remove(key);
};
