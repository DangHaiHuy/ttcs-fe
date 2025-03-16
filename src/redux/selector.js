export const userInfoSelector = (state) => state.user;

export const toggleReloadHistorySelector = (state) => state.chat.toggleReloadHistory;

export const chatRoomFocusSelector = (state) => state.chatRoom.chatRoomFocus;

export const websocketClientSelector = (state) => state.websocketClient.client;

export const chatMessageSelector = (state) => state.chatMessage.messages;

export const listChatRoomsSelector = (state) => state.listChatRooms.listChatRooms;

export const userInfoPictureSelector = (state) => state.user.picture;

export const keySearchSelector = (state) => state.chat.keySearch;

export const sidebarTitleSelector = (state) => state.sidebar.sidebarTitle;
