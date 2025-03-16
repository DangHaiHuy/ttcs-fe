import useHttpPrivate from '../hooks/useHttpPrivate';
import useHttpPublic from '../hooks/useHttpPublic';

function useUserServicePublic() {
    const httpRequestPublic = useHttpPublic();

    const register = async (body) => {
        try {
            const res = await httpRequestPublic.post('/users', body);
            return res.data;
        } catch (error) {
            if (Array.isArray(error.response.data)) return error.response.data;
        }
    };

    const activate = async (param) => {
        try {
            const res = await httpRequestPublic.post('/users/activate', null, {
                params: {
                    email: param.email,
                    code: param.code,
                },
            });
            // const res = await httpRequestPublic.post(
            //     `/users/activate?code=${encodeURIComponent(param.code)}&email=${param.email}`,
            // );
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const getHiddenEmail = async (username) => {
        try {
            const res = await httpRequestPublic.get(`/users/get-hidden-email/${username}`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const resetPassword = async (body) => {
        try {
            const res = await httpRequestPublic.put(`/users/reset-password`, body);
            return res.data;
        } catch (error) {
            if (Array.isArray(error.response.data)) return error.response.data;
        }
    };

    return { register, activate, getHiddenEmail, resetPassword };
}

export default useUserServicePublic;
