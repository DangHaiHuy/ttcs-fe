import { DashOutlined, SendOutlined } from '@ant-design/icons';
import { Avatar, message, Switch, Typography } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import { memo, useState } from 'react';
import avatar from '../../assets/Images/avatar.jpg';
import useUserSearchHistoryService from '../../services/useUserSearchHistoryService';
import { useDispatch, useSelector } from 'react-redux';
import { toggleReloadHistorySearch } from '../../redux/action/chatAction';
import { getLastAccess } from '../../services/caculateTimeService';
import clsx from 'clsx';
import { setInfoChatRoomFocusAction } from '../../redux/action/chatRoomAction';
import { chatRoomFocusSelector } from '../../redux/selector';
import useWebsocketService from '../../services/useWebsocketService';
import { v4 } from 'uuid';

const { Text } = Typography;

function BoxUser({
    isRenderMessage,
    user,
    searchMode,
    lastAccess,
    lastMessage,
    room,
    index,
    isActive = false,
    className,
    isForwarding,
    message,
}) {
    const dispatch = useDispatch();

    const { addUserHistory } = useUserSearchHistoryService();
    const { sendMessage } = useWebsocketService();
    const chatRoomFocus = useSelector(chatRoomFocusSelector);
    const handleClick = async (id, room, index) => {
        if (isForwarding === true) {
            return;
        }
        if (searchMode === true) {
            const body = {
                id,
            };
            const res = await addUserHistory(body);
            if (!res) return;
            dispatch(toggleReloadHistorySearch());
        } else {
        }
        if (chatRoomFocus?.receiver?.id !== room?.receiver?.id) {
            dispatch(
                setInfoChatRoomFocusAction({
                    chatRoomFocus: room,
                }),
            );
        }
    };
    const handleForwardMessage = async () => {
        sendMessage(v4(), user.id, message.content, message.type);
    };
    return (
        <>
            <div
                className={clsx('h-[80px] p-[8px] flex items-center cursor-pointer hover:bg-slate-200 group', {
                    'bg-blue-100': isActive,
                    'bg-slate-50': !isActive,
                    [className]: className,
                })}
                style={{ maxHeight: '80px' }}
                onClick={() => handleClick(user?.id, room, index)}
            >
                <div className="w-[60px] h-[60px]">
                    <Avatar size={60} src={user?.picture || avatar} />
                </div>
                <div
                    className={clsx('pl-[8px] flex-1 flex flex-col items-space-between relative', {
                        ['max-w-[272px]']: !isForwarding,
                    })}
                    // style={{ maxWidth: '272px' }}
                >
                    <Title
                        level={5}
                        className="m-0 pr-[72px] flex items-center"
                        ellipsis={{ rows: 1, expandable: false }}
                        style={{ maxWidth: '100%', margin: '0' }}
                    >
                        <span
                            style={{
                                maxWidth: 'calc(100% - 20px)',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {user ? `${user.lastName || ''} ${user.firstName || ''}` : 'Ant Design'}
                        </span>
                        {isRenderMessage && user.state === 'ONLINE' && (
                            <div className="rounded-full w-[8px] h-[8px] ml-[6px] mt-[1px]  bg-lime-500"></div>
                        )}
                    </Title>
                    {isRenderMessage && (
                        <div className="absolute right-[8px] top-0 hidden group-hover:inline-block">
                            <DashOutlined />
                        </div>
                    )}

                    {isRenderMessage && (
                        <>
                            <div className="absolute right-[8px] top-0 group-hover:hidden text-xs leading-7">
                                {getLastAccess(lastAccess)}
                            </div>
                            <Typography.Paragraph
                                ellipsis={{ rows: 1, expandable: false }}
                                style={{ maxWidth: '100%', margin: '0' }}
                            >
                                {lastMessage}
                            </Typography.Paragraph>
                        </>
                    )}
                </div>
                {isForwarding && (
                    <div
                        className="aspect-square w-[40px] rounded-full bg-cyan-500 flex items-center justify-center text-white hover:bg-cyan-600"
                        onClick={handleForwardMessage}
                    >
                        <SendOutlined />
                    </div>
                )}
            </div>
        </>
    );
}

export default memo(BoxUser);
