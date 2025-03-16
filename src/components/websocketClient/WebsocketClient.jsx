import { useEffect } from 'react';
import { ACCESS_TOKEN, getToken } from '../../services/tokenService';
import { Client } from '@stomp/stompjs';
import { useDispatch, useSelector } from 'react-redux';
import { setClientAction } from '../../redux/action/websocketClientAction';
import { userInfoSelector } from '../../redux/selector';
import {
    updateChatRoomDeleted,
    updateListChatRoomsAction,
    updateStateAction,
} from '../../redux/action/listChatRoomAction';
import { addMessageAction, deleteMessageAction } from '../../redux/action/chatMessageAction';
import { updateStateChatRoomFocusAction } from '../../redux/action/chatRoomAction';
import { toast } from 'react-toastify';

let retry = 0;
const MAX_RETRY = 3;

function WebsocketClient({ children }) {
    const myUser = useSelector(userInfoSelector);
    const dispatch = useDispatch();
    useEffect(() => {
        const client = new Client({
            //cho vào trong hàm vì nếu cho ngoài thì nếu getMyInfo phải refresh lại do hết hạn token thì client lấy token cũ
            webSocketFactory: () => new WebSocket('ws://localhost:8080/ws'),
            connectHeaders: {
                Authorization: `Bearer ${getToken(ACCESS_TOKEN)}`,
            },
            onConnect: () => {
                retry = 0;
                client.subscribe('/user/queue/messages', (payload) => {
                    const body = JSON.parse(payload.body);
                    if (body?.type === 'DELETED') {
                        dispatch(deleteMessageAction(body));
                        dispatch(updateChatRoomDeleted(body));
                        return;
                    }
                    dispatch(addMessageAction(body));
                    dispatch(
                        updateListChatRoomsAction({
                            chatId: body?.chatId,
                            lastMessage: body?.content,
                            lastAccess: body?.timestamp,
                            senderId: myUser.id,
                            receiver: myUser.id === body?.sender?.id ? body?.receiver : body?.sender,
                        }),
                    );
                });
                client.subscribe('/user/queue/errors', (payload) => {
                    const body = JSON.parse(payload.body);
                    toast.error(body?.errMessage || body?.message || 'Có lỗi xảy ra');
                });
                client.subscribe('/user/queue/state', (payload) => {
                    const body = JSON.parse(payload.body);
                    dispatch(updateStateAction(body));
                    dispatch(updateStateChatRoomFocusAction(body));
                });
            },
            onStompError: () => {},
            onWebSocketError: () => {
                toast.error('Không thể kết nối');
            },
            reconnectDelay: 3000,
            beforeConnect: () => {
                if (retry >= MAX_RETRY) {
                    toast.error('Không thể kết nối');
                    client.deactivate();
                    return false;
                }
                retry++;
            },
        });
        client.activate();
        dispatch(setClientAction(client));
        return () => {
            client.deactivate();
        };
    }, []);
    return <>{children}</>;
}

export default WebsocketClient;
