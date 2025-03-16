import useHttpPrivate from '../hooks/useHttpPrivate';

function useUserServicePrivate() {
    const httpRequestPrivate = useHttpPrivate();

    const getMyInfo = async () => {
        try {
            const res = await httpRequestPrivate.get('/users/myInfo');
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const searchUserByKey = async (key, page) => {
        try {
            const res = await httpRequestPrivate.get('/users/search-user', {
                params: {
                    key,
                    page: page || 1,
                },
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const updateInfo = async (body) => {
        try {
            const res = await httpRequestPrivate.put('/users/updateInfo', body);
            return res.data;
        } catch (error) {
            if (Array.isArray(error.response.data)) return error.response.data;
        }
    };

    const updateAvatar = async (multipartFile) => {
        try {
            const formData = new FormData();
            formData.append('multipartFile', multipartFile);
            const res = await httpRequestPrivate.put(`/users/updateAvatar`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const changePassword = async (body) => {
        try {
            const res = await httpRequestPrivate.put(`/users/change-password`, body);
            return res.data;
        } catch (error) {
            if (Array.isArray(error.response.data)) return error.response.data;
        }
    };

    const blockUser = async (userId) => {
        try {
            const res = await httpRequestPrivate.post(`/users/block-user/${userId}`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const unblockUser = async (userId) => {
        try {
            const res = await httpRequestPrivate.post(`/users/unblock-user/${userId}`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const checkBlockedUser = async (userId) => {
        try {
            const res = await httpRequestPrivate.get(`/users/check-blocked-user/${userId}`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const getListBlockedUser = async () => {
        try {
            const res = await httpRequestPrivate.get(`/users/get-list-blocked-user`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    return {
        getMyInfo,
        searchUserByKey,
        updateInfo,
        updateAvatar,
        changePassword,
        blockUser,
        checkBlockedUser,
        unblockUser,
        getListBlockedUser,
    };
}

export default useUserServicePrivate;
