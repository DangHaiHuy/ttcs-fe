export const setSidebarTitleAction = (payload) => {
    return {
        type: 'sidebar/setSidebarTitle',
        payload,
    };
};

export const resetSidebarStateAction = () => {
    return {
        type: 'sidebar/resetSidebarState',
    };
};
