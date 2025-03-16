export const getMyInfoAction = (payload) => {
    return {
        type: 'user/getMyInfo',
        payload,
    };
};

export const logOutUserAction = (payload) => {
    return {
        type: 'user/logOut',
    };
};

export const updatePictureAction = (payload) => {
    return {
        type: 'user/updateAvatar',
        payload,
    };
};
