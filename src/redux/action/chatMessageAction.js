export const addMessageAction = (payload) => {
    return {
        type: 'chatMessage/addMessage',
        payload,
    };
};

export const addMessageArrayAction = (payload) => {
    return {
        type: 'chatMessage/addMessageArray',
        payload,
    };
};

export const resetMessageAction = () => {
    return {
        type: 'chatMessage/resetMessage',
    };
};

export const deleteMessageAction = (payload) => {
    return {
        type: 'chatMessage/deleteMessage',
        payload,
    };
};
