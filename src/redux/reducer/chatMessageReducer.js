const initstate = {
    messages: [],
};

const chatMessageReducer = (state = initstate, action) => {
    switch (action.type) {
        case 'chatMessage/addMessage':
            const filterMessages = state.messages.filter((message) => {
                if (message.id !== action.payload.id) {
                    return true;
                }
                return false;
            });
            return {
                ...state,
                messages: [action.payload, ...filterMessages],
            };
        case 'chatMessage/addMessageArray':
            return {
                ...state,
                messages: [...state.messages, ...action.payload],
            };
        case 'chatMessage/deleteMessage':
            const newMessages = state.messages.map((mes) => {
                if (mes.id === action.payload?.id) {
                    return {
                        ...mes,
                        content: '',
                        type: 'DELETED',
                    };
                }
                return mes;
            });
            return {
                ...state,
                messages: newMessages,
            };
        case 'chatMessage/resetMessage':
            return {
                ...state,
                messages: [],
            };
        default:
            return state;
    }
};

export default chatMessageReducer;
