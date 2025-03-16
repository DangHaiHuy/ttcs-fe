import { Avatar, Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import { chatRoomFocusSelector } from '../../redux/selector';
import ModalImage from '../modal/ModalImage';
import { memo, useState } from 'react';

function MesssageSender({ index, isRenderAvatar, message, handleClickImage }) {
    const chatRoomFocus = useSelector(chatRoomFocusSelector);
    return (
        <div className="mx-[12px] mb-[6px] flex items-center">
            {isRenderAvatar ? (
                <div className="w-[50px] mr-[12px] relative">
                    <Avatar
                        size={50}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        src={chatRoomFocus?.receiver?.picture}
                    />
                </div>
            ) : (
                <div className="mr-[12px] w-[50px]"></div>
            )}
            <Tooltip title={message?.timestamp}>
                {message.type === 'TEXT' && (
                    <div className="rounded-xl bg-slate-100 p-[8px] flex items-center h-max">
                        <p className="max-w-[500px] whitespace-pre-wrap break-words">{message.content}</p>
                    </div>
                )}
                {message.type === 'IMAGE' && (
                    <div className="cursor-pointer">
                        <img
                            className="max-h-[300px] w-auto rounded-xl max-w-[300px]"
                            src={message.content}
                            onClick={handleClickImage.bind(null, message)}
                        ></img>
                    </div>
                )}
                {message.type === 'AUDIO' && (
                    <div className="rounded-xl max-w-[500px]">
                        <audio controls src={message.content} style={{ maxHeight: '100%' }} />
                    </div>
                )}
                {message.type === 'DELETED' && (
                    <div className="rounded-xl bg-slate-100 p-[8px] flex items-center h-max opacity-50 cursor-default">
                        <p className="max-w-[500px] whitespace-pre-wrap break-words">Tin nhắn đã bị gỡ</p>
                    </div>
                )}
            </Tooltip>
        </div>
    );
}

export default memo(MesssageSender);
