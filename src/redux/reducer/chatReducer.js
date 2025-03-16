const initState = {
    toggleReloadHistory: false,
    keySearch: '',
    focusUser: '',
};

const chatReducer = (state = initState, action) => {
    switch (action.type) {
        case 'chat/toggleReloadHistorySearch':
            return {
                ...state,
                toggleReloadHistory: !state.toggleReloadHistory,
            };
        case 'chat/setKeySearch':
            return {
                ...state,
                keySearch: action.payload,
            };
        default:
            return state;
    }
};

export default chatReducer;
