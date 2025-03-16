const initState = {
    sidebarTitle: 'home',
};

const sidebarReducer = (state = initState, action) => {
    switch (action.type) {
        case 'sidebar/setSidebarTitle':
            return {
                ...state,
                sidebarTitle: action.payload,
            };
        case 'sidebar/resetSidebarState':
            return initState;
        default:
            return state;
    }
};

export default sidebarReducer;
