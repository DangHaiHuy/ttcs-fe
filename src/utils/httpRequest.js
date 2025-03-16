import axios from 'axios';

const httpRequestPublic = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const httpRequestPrivate = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export { httpRequestPrivate, httpRequestPublic };
