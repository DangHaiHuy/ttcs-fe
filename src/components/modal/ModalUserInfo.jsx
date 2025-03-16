import ClickAwayListener from 'react-click-away-listener';
import { useDispatch, useSelector } from 'react-redux';
import { chatRoomFocusSelector, userInfoSelector } from '../../redux/selector';
import { Avatar, Button } from 'antd';
import ModalConfirm from './ModalConfirm';
import { useEffect, useState } from 'react';
import useUserServicePrivate from '../../services/useUserServicePrivate';
import { toast } from 'react-toastify';
import { StopOutlined, UnlockOutlined } from '@ant-design/icons';
import { updateBlockedChatRoomFocusAction } from '../../redux/action/chatRoomAction';
import { updateListChatRoomsBlockedAction } from '../../redux/action/listChatRoomAction';
import useChatRoomService from '../../services/useChatRoomService';
import Post from '../admin/user/Post';
import { useNavigate } from 'react-router-dom';

function ModalUserInfo({ setOpenModalUserInfo }) {
    const [openModalConfirmBlock, setOpenModalConfirmBlock] = useState(false);
    const [openModalConfirmUnblock, setOpenModalConfirmUnblock] = useState(false);
    const [loading, setLoading] = useState(true);
    const [checkBlocked, setCheckBlocked] = useState(false);

    const chatRoomFocus = useSelector(chatRoomFocusSelector);
    const myId = useSelector(userInfoSelector)?.id;
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { blockUser, checkBlockedUser, unblockUser } = useUserServicePrivate();
    const { getChatRoomId } = useChatRoomService();

    const handleBlockUser = async () => {
        const userId = chatRoomFocus?.receiver?.id;
        if (userId) {
            const res = await blockUser(userId);
            if (!res) return;
            toast.success(res.result?.result);
            setCheckBlocked((prev) => !prev);
            dispatch(updateBlockedChatRoomFocusAction(true));
            dispatch(updateListChatRoomsBlockedAction({ blocked: true, chatId: getChatRoomId(myId, userId) }));
        }
    };
    const handleUnblockUser = async () => {
        const userId = chatRoomFocus?.receiver?.id;
        if (userId) {
            const res = await unblockUser(userId);
            if (!res) return;
            toast.success(res.result?.result);
            setCheckBlocked((prev) => !prev);
            if (res.result?.blockedBetweenTwoUser !== chatRoomFocus.blocked) {
                dispatch(updateBlockedChatRoomFocusAction(false));
                dispatch(updateListChatRoomsBlockedAction({ blocked: false, chatId: getChatRoomId(myId, userId) }));
            }
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const userId = chatRoomFocus?.receiver?.id;
            const res = await checkBlockedUser(userId);
            if (!res) {
                return;
            }
            setLoading(false);
            setCheckBlocked(res.result?.blocked);
        };
        fetchData();
    }, []);
    return (
        <div className="bg-gray-900/90 fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center">
            <ClickAwayListener
                onClickAway={() => {
                    setOpenModalUserInfo(false);
                }}
            >
                <div
                    className="relative w-[500px] bg-slate-500 rounded-2xl z-50 overflow-hidden flex flex-col"
                    style={{ maxHeight: '70%', maxWidth: '90%' }}
                >
                    <div className="p-[40px]">
                        <div className="flex justify-center items-center">
                            <Avatar
                                size={200}
                                src={chatRoomFocus?.receiver?.picture}
                                className="border-solid border-[2px] border-primary"
                            />
                        </div>
                        <div className="text-2xl text-center mt-[20px] text-cyan-300">
                            {`${chatRoomFocus?.receiver?.lastName} ${chatRoomFocus?.receiver?.firstName}`}
                        </div>
                        {!loading &&
                            (checkBlocked ? (
                                <Button
                                    type="primary"
                                    size="large"
                                    className="w-full mt-[20px]"
                                    icon={<UnlockOutlined />}
                                    onClick={() => {
                                        setOpenModalConfirmUnblock(true);
                                    }}
                                >
                                    Mở chặn người dùng
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        size="large"
                                        className="w-full mt-[20px]"
                                        icon={<StopOutlined />}
                                        onClick={() => {
                                            setOpenModalConfirmBlock(true);
                                        }}
                                    >
                                        Chặn người dùng
                                    </Button>
                                    <Button
                                        size="large"
                                        className="w-full mt-[8px]"
                                        icon={<StopOutlined />}
                                        type='primary'
                                        onClick={() => {
                                            navigate(`/user/${chatRoomFocus?.receiver?.id}`);
                                        }}
                                    >
                                        Xem trang cá nhân
                                    </Button>
                                </>
                            ))}
                        <ModalConfirm
                            title="Bạn có chắc chắn muốn chặn người dùng này"
                            openModal={openModalConfirmBlock}
                            setOpenModal={setOpenModalConfirmBlock}
                            onSubmit={handleBlockUser}
                        />
                        <ModalConfirm
                            title="Bạn có chắc chắn muốn mở chặn người dùng này"
                            openModal={openModalConfirmUnblock}
                            setOpenModal={setOpenModalConfirmUnblock}
                            onSubmit={handleUnblockUser}
                        />
                    </div>
                </div>
            </ClickAwayListener>
        </div>
    );
}

export default ModalUserInfo;
