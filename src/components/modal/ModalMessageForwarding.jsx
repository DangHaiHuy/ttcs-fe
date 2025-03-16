import { CloseOutlined } from '@ant-design/icons';
import ClickAwayListener from 'react-click-away-listener';
import { useSelector } from 'react-redux';
import { listChatRoomsSelector, userInfoSelector } from '../../redux/selector';
import BoxUser from '../boxChat/BoxUser';
import useChatRoomService from '../../services/useChatRoomService';
import Search from 'antd/es/input/Search';

function ModalMessageForwarding({ setOpenModalMessageForwarding, message }) {
    const listChatRooms = useSelector(listChatRoomsSelector);

    const myId = useSelector(userInfoSelector).id;

    const { getChatRoomId } = useChatRoomService();

    return (
        <div className="bg-gray-900/90 fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center">
            <ClickAwayListener
                onClickAway={() => {
                    setOpenModalMessageForwarding(false);
                }}
            >
                <div
                    className="relative justify-center items-center w-[700px] bg-slate-500 rounded-2xl p-[40px] z-50"
                    style={{ maxHeight: '70%', maxWidth: '90%' }}
                >
                    <div
                        className="absolute right-[10px] top-[10px] cursor-pointer"
                        onClick={() => {
                            setOpenModalMessageForwarding(false);
                        }}
                    >
                        <CloseOutlined style={{ fontSize: '25px' }} />
                    </div>
                    <div className="flex items-center">
                        <Search className="" placeholder="Tìm kiếm" size='large' />
                    </div>
                    <div
                        className="mt-[20px] w-full h-[300px] overflow-y-auto
                            [&::-webkit-scrollbar]:w-2
                            [&::-webkit-scrollbar-track]:bg-slate-500
                            [&::-webkit-scrollbar-thumb]:bg-gray-300
                            dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                    >
                        {listChatRooms ? (
                            <>
                                {listChatRooms.map((room, index) => {
                                    return (
                                        <div key={index}>
                                            <BoxUser
                                                isForwarding={true}
                                                message={message}
                                                isRenderMessage={false}
                                                user={room?.receiver}
                                                room={{
                                                    receiver: room?.receiver,
                                                    chatId: getChatRoomId(myId, room?.receiver?.id),
                                                }}
                                                className="bg-slate-500 hover:bg-slate-400 border"
                                            />
                                        </div>
                                    );
                                })}
                            </>
                        ) : (
                            <div>Nhập vào thanh search để tìm kiếm</div>
                        )}
                    </div>
                </div>
            </ClickAwayListener>
        </div>
    );
}

export default ModalMessageForwarding;
