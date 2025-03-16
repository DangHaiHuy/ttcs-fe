import { useSelector } from 'react-redux';
import BoxUser from './BoxUser';
import { userInfoSelector } from '../../redux/selector';
import ModalSearchUser from '../modal/ModalSearchUser';
import { useState } from 'react';

function SearchBox({ userSearchList, historySearchMode, listUserSearchHistory }) {
    const [openModalSearchUser, setOpenModalSearchUser] = useState(false);

    const getChatRoomId = (senderId, receiverId) => {
        if (senderId < receiverId) return `${senderId}_${receiverId}`;
        else return `${receiverId}_${senderId}`;
    };

    const myId = useSelector(userInfoSelector).id;

    return (
        <div className="w-[350px]">
            <div
                className="overflow-y-auto
                    [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                    dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 bg-slate-50"
                style={{ height: 'calc(100vh - 60px)' }}
            >
                {historySearchMode == true ? (
                    <>
                        <div className="px-[12px]">Lịch sử tìm kiếm</div>
                        {listUserSearchHistory.length > 0 &&
                            listUserSearchHistory.map((user, index) => {
                                return (
                                    <div key={index}>
                                        <BoxUser
                                            isRenderMessage={false}
                                            user={user.user}
                                            searchMode={true}
                                            room={{
                                                receiver: user.user,
                                                chatId: getChatRoomId(myId, user.user.id),
                                                blocked: user.blocked,
                                            }}
                                        />
                                    </div>
                                );
                            })}
                    </>
                ) : userSearchList.length > 0 ? (
                    <>
                        {userSearchList.map((user, index) => {
                            return (
                                <div key={index}>
                                    <BoxUser
                                        isRenderMessage={false}
                                        user={user}
                                        searchMode={true}
                                        room={{ receiver: user, chatId: getChatRoomId(myId, user.id) }}
                                    />
                                </div>
                            );
                        })}
                        <div className="flex items-center justify-center">
                            <div
                                className="text-center cursor-pointer rounded-lg bg-slate-200 px-[16px] py-[4px] mt-[4px]"
                                onClick={() => setOpenModalSearchUser(true)}
                            >
                                Xem tất cả
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="w-full h-full relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                            Không tìm thấy người dùng
                        </div>
                    </div>
                )}
            </div>
            {openModalSearchUser && (
                <ModalSearchUser
                    setOpenModalSearchUser={setOpenModalSearchUser}
                    data={userSearchList}
                ></ModalSearchUser>
            )}
        </div>
    );
}

export default SearchBox;
