import { Client } from '@stomp/stompjs';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BoxChat from '../../components/boxChat/BoxChat';
import ChatArea from '../../components/chatArea/ChatArea';
import { chatRoomFocusSelector } from '../../redux/selector';
import { ACCESS_TOKEN, getToken } from '../../services/tokenService';
import logo from '../../Assets/Images/H_Chat.png';
import { useEffect } from 'react';
import { setSidebarTitleAction } from '../../redux/action/sidebarAction';

function Home() {
    // const { getMyInfo } = useUserServicePrivate();
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const res = await getMyInfo();
    //         if (!res) return;
    //         toast.success('1' + res);
    //     };

    //     fetchData();
    // }, []);
    // const userInfo = useSelector(userInfoSelector);
    // useEffect(() => {
    //     console.log(userInfo);
    // }, []);
    const chatRoomFocus = useSelector(chatRoomFocusSelector);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSidebarTitleAction('home'));
    }, []);

    // const client = new Client({
    //     webSocketFactory: () => new WebSocket('ws://localhost:8080/ws'),
    //     connectHeaders: {
    //         Authorization: `Bearer ${getToken(ACCESS_TOKEN)}`,
    //     },
    //     onConnect: () => {
    //         alert('Connect');
    //         client.subscribe(
    //             '/user/queue/messages',
    //             (payload) => {
    //                 console.log(typeof payload);
    //             },
    //             {
    //                 Authorization: `Bearer ${getToken(ACCESS_TOKEN)}`,
    //             },
    //         );
    //         client.subscribe(
    //             '/user/queue/errors',
    //             (payload) => {
    //                 console.log('receive error ' + payload.body);
    //             },
    //             {
    //                 Authorization: `Bearer ${getToken(ACCESS_TOKEN)}`,
    //             },
    //         );
    //     },
    //     onStompError: () => {
    //         alert('Errror');
    //     },
    //     onWebSocketError: () => {
    //         alert('E');
    //     },
    //     reconnectDelay: -1,
    // });

    return (
        <div className="flex ">
            {/* <button onClick={handle}>Click</button>
            <button
                onClick={() => {
                    client.publish({
                        destination: '/app/chat',
                        headers: {
                            Authorization: `Bearer ${getToken(ACCESS_TOKEN)}`,
                        },
                        body: JSON.stringify({
                            receiverId: '1f364d51-067e-41c4-8c87-dc7b20fdb5be',
                            content: 'aknjadknakd adnjkadn and kad and ka adnkad andkandaka ajadndasknsda  adjka a ajndasja adjnadnj anjdasnjads ajdajads an jdanjadsad adjad ad ajdan ',
                        }),
                    });
                }}
            >
                me
            </button>  */}
            <BoxChat />
            {chatRoomFocus ? (
                <ChatArea />
            ) : (
                <div className="bg-slate-300 flex-1 flex justify-center items-center">
                    <img src={logo} className="w-[300px] h-[300px]"></img>
                </div>
            )}
        </div>
    );
}

export default Home;
