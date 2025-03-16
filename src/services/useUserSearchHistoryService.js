import useHttpPrivate from '../hooks/useHttpPrivate';

function useUserSearchHistoryService() {
    const httpRequestPrivate = useHttpPrivate();

    const getListUserSearchHistory = async () => {
        try {
            const res = await httpRequestPrivate.get('/api/v1/search-user-history');
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const addUserHistory = async (body) => {
        try {
            const res = await httpRequestPrivate.post('/api/v1/search-user-history/add-user', body);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    return { getListUserSearchHistory, addUserHistory };
}

export default useUserSearchHistoryService;
