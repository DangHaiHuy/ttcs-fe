const initstate = {
    client: null,
};

const websocketClientReducer = (state = initstate, action) => {
    switch (action.type) {
        case 'websocketClient/setClient':
            return {
                ...state,
                client: action.payload,
            };
        default:
            return state;
    }
};

export default websocketClientReducer;
