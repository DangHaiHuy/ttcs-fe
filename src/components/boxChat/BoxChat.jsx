import { useEffect, useState } from 'react';
import BoxUser from './BoxUser';
import SearchBar from './SearchBar';
import SearchBox from './SearchBox';
import useChatRoomService from '../../services/useChatRoomService';
import Loading from '../loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { chatRoomFocusSelector, listChatRoomsSelector } from '../../redux/selector';
import { setListChatRoomsAction } from '../../redux/action/listChatRoomAction';

function BoxChat() {
    const [searchMode, setSearchMode] = useState(false);
    const [historySearchMode, setHistorySearchMode] = useState(false);
    const [userSearchList, setUserSearchList] = useState([]);
    const [listUserSearchHistory, setListUserSearchHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const chatRoomFocus = useSelector(chatRoomFocusSelector);
    const listChatRooms = useSelector(listChatRoomsSelector);

    const { getMyChatRooms } = useChatRoomService();

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await getMyChatRooms();
            if (!res) {
                setLoading(false);
                return;
            } else {
                dispatch(setListChatRoomsAction(res?.result?.items));
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <div className="w-[350px] h-screen relative">
            <SearchBar
                setListUserSearchHistory={setListUserSearchHistory}
                setUserSearchList={setUserSearchList}
                setSearchMode={setSearchMode}
                setHistorySearchMode={setHistorySearchMode}
                searchMode={searchMode}
            />
            {searchMode ? (
                <SearchBox
                    userSearchList={userSearchList}
                    historySearchMode={historySearchMode}
                    listUserSearchHistory={listUserSearchHistory}
                />
            ) : (
                <div
                    className="overflow-y-auto
                        [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:bg-gray-300
                        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 relative bg-sky-50"
                    style={{ maxHeight: 'calc(100vh - 60px)', height: 'calc(100vh - 60px)' }}
                >
                    {loading ? (
                        <Loading fontSize={30}></Loading>
                    ) : (
                        listChatRooms.map((room, index) => {
                            return (
                                <div key={index}>
                                    <BoxUser
                                        user={room.receiver}
                                        isRenderMessage={true}
                                        searchMode={false}
                                        lastAccess={room.lastAccess}
                                        lastMessage={room?.lastMessage || ''}
                                        room={room}
                                        index={index}
                                        isActive={chatRoomFocus?.receiver?.id === room?.receiver?.id}
                                    />
                                </div>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
}

export default BoxChat;
