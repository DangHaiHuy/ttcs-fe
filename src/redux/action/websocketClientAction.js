export const setClientAction = (payload) => {
    return {
        type: 'websocketClient/setClient',
        payload,
    };
};
