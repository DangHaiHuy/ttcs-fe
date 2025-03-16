import useHttpPublic from '../hooks/useHttpPublic';

const useAuthenService = () => {
    const httpRequestPublic = useHttpPublic();

    const refreshToken = async (body) => {
        try {
            const res = await httpRequestPublic.post('/auth/refresh', body);
            return res.data;
        } catch (error) {
            console.log(error);
            return error.response.data;
        }
    };

    const login = async (body) => {
        try {
            const res = await httpRequestPublic.post('/auth/token', body);
            return res.data;
        } catch (error) {
            console.log(error);
            if (Array.isArray(error.response.data)) return error.response.data;
        }
    };

    const authenGoogle = async (code) => {
        try {
            const res = await httpRequestPublic.post(`/auth/outbound/authentication?code=${code}`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const logOut = async (body) => {
        try {
            const res = await httpRequestPublic.post('/auth/logout', body);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
    return {
        refreshToken,
        login,
        authenGoogle,
        logOut,
    };
};

export default useAuthenService;
