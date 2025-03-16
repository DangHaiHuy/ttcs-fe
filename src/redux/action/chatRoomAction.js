export const setInfoChatRoomFocusAction = (payload) => {
    return {
        type: 'chatRoom/setInfoChatRoomFocus',
        payload,
    };
};

export const deleteInfoChatRoomFocusAction = () => {
    return {
        type: 'chatRoom/deleteInfoChatRoomFocus',
    };
};

export const updateStateChatRoomFocusAction = (payload) => {
    return {
        type: 'chatRoom/updateStateChatRoomFocus',
        payload,
    };
};

export const updateBlockedChatRoomFocusAction = (payload) => {
    return {
        type: 'chatRoom/updateBlockedChatRoomFocus',
        payload,
    };
};
