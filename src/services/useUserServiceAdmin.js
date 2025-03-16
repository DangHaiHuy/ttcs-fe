import useHttpPrivate from '../hooks/useHttpPrivate';

function useUserServiceAdmin() {
    const httpRequestPrivate = useHttpPrivate();

    const getAllUser = async (page, limit, username, firstName, lastName, phone, email) => {
        try {
            const params = Object.fromEntries(
                Object.entries({ page, limit, username, firstName, lastName, phone, email }).filter(
                    ([_, value]) => !!value,
                ),
            );

            const res = await httpRequestPrivate.get('/users/get-all-users', {
                params: params,
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const lockUser = async (body) => {
        try {
            const res = await httpRequestPrivate.put('/admin/lock-user', body);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const unlockUser = async (body) => {
        try {
            const res = await httpRequestPrivate.put('/admin/unlock-user', body);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    return { getAllUser, lockUser,unlockUser };
}

export default useUserServiceAdmin;
