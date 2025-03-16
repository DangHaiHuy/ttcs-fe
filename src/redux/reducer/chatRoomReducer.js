const initState = {
    chatRoomFocus: null,
};

const chatRoomReducer = (state = initState, action) => {
    switch (action.type) {
        case 'chatRoom/setInfoChatRoomFocus':
            return {
                ...state,
                chatRoomFocus: action.payload.chatRoomFocus,
            };
        case 'chatRoom/deleteInfoChatRoomFocus':
            return {
                ...state,
                chatRoomFocus: null,
            };
        case 'chatRoom/updateStateChatRoomFocus':
            if (state.chatRoomFocus?.receiver?.id === action.payload.id) {
                return {
                    ...state,
                    chatRoomFocus: {
                        ...state.chatRoomFocus,
                        receiver: {
                            ...state.chatRoomFocus?.receiver,
                            state: action.payload.state,
                        },
                    },
                };
            }
            return state;
        case 'chatRoom/updateBlockedChatRoomFocus':
            return {
                ...state,
                chatRoomFocus: {
                    ...state.chatRoomFocus,
                    blocked: action.payload,
                },
            };
        default:
            return state;
    }
};

export default chatRoomReducer;
