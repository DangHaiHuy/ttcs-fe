export const setListChatRoomsAction = (payload) => {
    return {
        type: 'listChatRooms/setListChatRooms',
        payload,
    };
};

export const updateListChatRoomsAction = (payload) => {
    return {
        type: 'listChatRooms/updateListChatRooms',
        payload,
    };
};

export const updateStateAction = (payload) => {
    return {
        type: 'listChatRooms/updateState',
        payload,
    };
};

export const updateChatRoomDeleted = (payload) => {
    return {
        type: 'listChatRooms/updateChatRoomDeleted',
        payload,
    };
};

export const updateListChatRoomsBlockedAction = (payload) => {
    return {
        type: 'listChatRooms/updateBlocked',
        payload,
    };
};
