import { combineReducers } from 'redux';
import userReducer from './userReducer';
import chatReducer from './chatReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import chatRoomReducer from './chatRoomReducer';
import websocketClientReducer from './websocketClientReducer';
import chatMessageReducer from './chatMessageReducer';
import listChatRoomsReducer from './listChatRoomsReducer';
import sidebarReducer from './sidebarReducer';

const persistConfig = {
    key: 'user',
    storage,
};

const chatRoomConfig = {
    key: 'chatRoom',
    storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedChatRoomReducer = persistReducer(chatRoomConfig, chatRoomReducer);

const rootReducer = combineReducers({
    user: persistedUserReducer,
    chatRoom: persistedChatRoomReducer,
    chat: chatReducer,
    websocketClient: websocketClientReducer,
    chatMessage: chatMessageReducer,
    listChatRooms: listChatRoomsReducer,
    sidebar: sidebarReducer,
});

export default rootReducer;
