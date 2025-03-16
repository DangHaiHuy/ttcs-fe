import { CloseOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import BoxUser from '../boxChat/BoxUser';
import { useSelector } from 'react-redux';
import { keySearchSelector, userInfoSelector } from '../../redux/selector';
import useUserServicePrivate from '../../services/useUserServicePrivate';
import Loading from '../loading/Loading';
import useChatRoomService from '../../services/useChatRoomService';

function ModalSearchUser({ setOpenModalSearchUser, data }) {
    const [userSearchList, setUserSearchList] = useState(data);
    const [loadingUser, setLoadingUser] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const observe = useRef();

    const keySearch = useSelector(keySearchSelector);
    const myId = useSelector(userInfoSelector).id;

    const { searchUserByKey } = useUserServicePrivate();
    const { getChatRoomId } = useChatRoomService();

    const lastUserRef = useCallback(
        (node) => {
            if (loadingUser) return;
            if (observe.current) observe.current.disconnect();
            observe.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prev) => prev + 1);
                }
            });
            if (node) {
                observe.current.observe(node);
            }
        },
        [hasMore],
    ); //phải dùng usecallback ở đây vì nếu không dùng, nếu lướt đến phần tử quan sát thì sẽ setPage mới, và rerender lại thì lại
    // tạo 1 observer mới quan sát chính phần tử đấy, dẫn đến setPage vô hạn khi lướt trúng
    // khi dùng useCallback, khi lướt đến phần tử quan sát thì setPage mới tuy nhiên vẫn là observer cũ nên khi lướt đến thì vẫn
    // chỉ tăng page lên 1 lần
    useEffect(() => {
        if (page === 1) return;
        const fetchData = async () => {
            setLoadingUser(true);
            const res = await searchUserByKey(keySearch, page);
            setLoadingUser(false);
            if (!res) {
                return;
            }
            setHasMore(res?.result?.items.length > 0);
            setUserSearchList((prev) => {
                return [...prev, ...res?.result?.items];
            });
        };
        fetchData();
    }, [page]);
    return (
        <div className="bg-gray-900/90 fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center">
            <ClickAwayListener
                onClickAway={() => {
                    setOpenModalSearchUser(false);
                }}
            >
                <div
                    className="relative flex justify-center items-center w-[700px] bg-slate-500 rounded-2xl p-[40px] z-50"
                    style={{ maxHeight: '70%', maxWidth: '90%' }}
                >
                    <div
                        className="absolute right-[10px] top-[10px] cursor-pointer"
                        onClick={() => {
                            setOpenModalSearchUser(false);
                        }}
                    >
                        <CloseOutlined style={{ fontSize: '25px' }} />
                    </div>
                    <div
                        className="w-full h-[300px] overflow-y-auto
                            [&::-webkit-scrollbar]:w-2
                            [&::-webkit-scrollbar-track]:bg-slate-500
                            [&::-webkit-scrollbar-thumb]:bg-gray-300
                            dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                    >
                        {userSearchList.length > 0 ? (
                            <>
                                {userSearchList.map((user, index) => {
                                    return (
                                        <div key={index} ref={index === userSearchList.length - 1 ? lastUserRef : null}>
                                            <BoxUser
                                                isRenderMessage={false}
                                                user={user}
                                                searchMode={true}
                                                room={{ receiver: user, chatId: getChatRoomId(myId, user.id) }}
                                                className="bg-slate-500 hover:bg-slate-400 border"
                                            />
                                        </div>
                                    );
                                })}
                                {loadingUser && (
                                    <div className="relative w-full h-[40px]">
                                        <Loading fontSize={20}></Loading>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div>Không tìm thấy kết quả nào</div>
                        )}
                    </div>
                </div>
            </ClickAwayListener>
        </div>
    );
}

export default ModalSearchUser;
