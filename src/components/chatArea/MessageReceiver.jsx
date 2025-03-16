import { memo, useEffect, useState } from 'react';
import Loading from '../loading/Loading';
import { Popover, Tooltip } from 'antd';
import { SmallDashOutlined } from '@ant-design/icons';
import MenuMessage from './MenuMessage';

function MessageReceiver({ index, message, isSending, handleClickImage }) {
    const [messageId, setMessageId] = useState(message?.id);
    useEffect(() => {
        setMessageId(message?.id);
    }, [message]);
    return (
        <div className="flex justify-end mb-[6px] relative group">
            <div className="relative">
                <Tooltip title={message?.timestamp} placement="top">
                    {message.type === 'TEXT' && (
                        <div className="rounded-xl bg-cyan-400 p-[8px] mx-[16px] bg-cyan-500 text-white">
                            <p className="max-w-[500px] whitespace-pre-wrap break-words">{message.content}</p>
                        </div>
                    )}
                    {message.type == 'IMAGE' && (
                        <div className="mx-[16px] cursor-pointer">
                            <img
                                className="max-h-[300px] w-auto rounded-xl max-w-[300px]"
                                src={message.content}
                                onClick={handleClickImage.bind(null, message)}
                            ></img>
                        </div>
                    )}
                    {message.type === 'AUDIO' && (
                        <div className="rounded-xl mx-[16px] max-w-[500px]">
                            <audio controls src={message.content} style={{maxHeight:'100%'}}/>
                        </div>
                    )}
                    {message.type === 'DELETED' && (
                        <div className="rounded-xl bg-cyan-400 p-[8px] mx-[16px] bg-cyan-500 text-white opacity-50 cursor-default">
                            <p className="max-w-[500px] whitespace-pre-wrap break-words">Tin nhắn đã bị gỡ</p>
                        </div>
                    )}
                </Tooltip>
                {message.type !== 'DELETED' && (
                    <Popover
                        overlayInnerStyle={{
                            padding: '0',
                            overflow: 'hidden',
                            backgroundColor: 'rgb(71 85 105 / var(--tw-bg-opacity, 1))',
                        }}
                        color="rgb(71 85 105 / var(--tw-bg-opacity, 1))"
                        trigger="click"
                        placement="topRight"
                        content={<MenuMessage messageId={messageId} message={message}></MenuMessage>}
                    >
                        <div className="absolute top-1/2 -translate-y-1/2 -left-[16px] cursor-pointer py-[4px] hidden group-hover:block">
                            <SmallDashOutlined style={{ fontSize: '20px' }} />
                        </div>
                    </Popover>
                )}
            </div>
            <div className="absolute bottom-[2px] right-[4px] w-[10px] h-[10px]">
                {isSending && <Loading fontSize={8}></Loading>}
            </div>
        </div>
    );
}

export default memo(MessageReceiver);
