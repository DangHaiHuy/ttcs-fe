const initState = {
    id: '',
    username: '',
    firstName: '',
    lastName: '',
    dob: '',
    picture: '',
    namePictureFirebase: '',
    location: '',
    phone: '',
    email: '',
    activated: '',
    authorities: [],
};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'user/getMyInfo':
            const authorities = action.payload?.authorities[0]?.authority;
            return {
                id: action.payload?.id,
                username: action.payload?.username,
                firstName: action.payload?.firstName,
                lastName: action.payload?.lastName,
                dob: action.payload?.dob,
                picture: action.payload?.picture,
                namePictureFirebase: action.payload?.namePictureFirebase,
                location: action.payload?.location,
                phone: action.payload?.phone,
                email: action.payload?.email,
                activated: action.payload?.activated,
                authorities: authorities,
            };
        case 'user/updateAvatar':
            return {
                ...state,
                picture: action.payload,
            };
        case 'user/logOut':
            return initState;
        default:
            return state;
    }
};

export default userReducer;
