export const toggleReloadHistorySearch = () => {
    return {
        type: 'chat/toggleReloadHistorySearch',
    };
};

export const setKeySearchAction = (payload) => {
    return {
        type: 'chat/setKeySearch',
        payload,
    };
};
