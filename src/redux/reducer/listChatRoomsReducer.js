import { compareTime } from '../../services/caculateTimeService';

const initstate = {
    listChatRooms: [],
};

const listChatRoomsReducer = (state = initstate, action) => {
    switch (action.type) {
        case 'listChatRooms/setListChatRooms':
            return {
                ...state,
                listChatRooms: action.payload,
            };
        case 'listChatRooms/updateListChatRooms':
            let id = '';
            let receiver = {};
            const filterListChatRooms = state.listChatRooms.filter((room) => {
                if (room.chatId !== action.payload.chatId) {
                    return true;
                }
                id = room.id;
                receiver = room.receiver;
                return false;
            });
            const updateRoom = {
                id,
                receiver,
                ...action.payload,
            };

            return {
                ...state,
                listChatRooms: [updateRoom, ...filterListChatRooms],
            };
        case 'listChatRooms/updateChatRoomDeleted':
            const listChatRoomUpdate = state.listChatRooms.map((room) => {
                if (room.chatId !== action.payload.chatId) {
                    return room;
                }
                if (compareTime(action.payload.timestamp, room.lastAccess) >= 0) {
                    return {
                        ...room,
                        lastMessage: 'Tin nhắn đã bị gỡ',
                    };
                } else return room;
            });
            return {
                ...state,
                listChatRooms: listChatRoomUpdate,
            };
        case 'listChatRooms/updateState':
            const mapRooms = state.listChatRooms.map((room, index) => {
                if (room?.receiver?.id === action.payload?.id) {
                    return {
                        ...room,
                        receiver: {
                            ...room.receiver,
                            state: action.payload.state,
                        },
                    };
                }
                return room;
            });
            return {
                ...state,
                listChatRooms: mapRooms,
            };
        case 'listChatRooms/updateBlocked':
            const updateRoomsBlocked = state.listChatRooms.map((room) => {
                if (room.chatId === action.payload.chatId) {
                    return {
                        ...room,
                        blocked: action.payload.blocked,
                    };
                }
                return room;
            });
            return {
                ...state,
                listChatRooms: updateRoomsBlocked,
            };
        default:
            return state;
    }
};

export default listChatRoomsReducer;
