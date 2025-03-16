import { AudioOutlined, CloseCircleOutlined, FileImageOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chatRoomFocusSelector, userInfoSelector } from '../../redux/selector';
import useWebsocketService from '../../services/useWebsocketService';
import { v4 } from 'uuid';
import { addMessageAction } from '../../redux/action/chatMessageAction';
import Emoji from '../emoji/Emoji';
import ClickAwayListener from 'react-click-away-listener';
import useChatMessageService from '../../services/useChatMessageService';
import VoiceRecorder from './VoiceRecorder';
import loadingGif from '../../assets/Images/giphy.gif';

function MessageForm() {
    const [messageContent, setMessageContent] = useState('');
    const [isOpenEmoji, setIsOpenEmoji] = useState(false);
    const [isRecording, setIsRecording] = useState(false);

    const textareaRef = useRef(null);
    const chatRoomFocus = useSelector(chatRoomFocusSelector);
    const myId = useSelector(userInfoSelector)?.id;
    const { sendMessage } = useWebsocketService();
    const { saveMessageTypeImage } = useChatMessageService();

    const fileInputRef = useRef();
    const audioRef = useRef();
    useEffect(() => {
        setTimeout(() => {
            console.log(audioRef);
        }, 3000);
    }, []);

    const dispatch = useDispatch();

    const getChatRoomId = (senderId, receiverId) => {
        if (senderId < receiverId) return `${senderId}_${receiverId}`;
        else return `${receiverId}_${senderId}`;
    };

    useEffect(() => {
        if (textareaRef.current) {
            setMessageContent('');
            textareaRef.current.focus();
        }
    }, [chatRoomFocus?.receiver?.id]);

    const handleSendMessage = () => {
        if (audioRef.current && isRecording) {
            audioRef.current.handleSendAudio();
            return;
        }
        const receiverId = chatRoomFocus?.receiver?.id;
        const id = v4();
        sendMessage(id, receiverId, messageContent, 'TEXT');
        setMessageContent('');
        textareaRef.current.focus();
        dispatch(
            addMessageAction({
                id: id,
                chatId: getChatRoomId(myId, receiverId),
                sender: {
                    id: myId,
                },
                receiver: {
                    id: receiverId,
                },
                content: messageContent,
                isSending: true,
                type: 'TEXT',
            }),
        );
    };

    const handleAddEmoji = (e) => {
        if (!textareaRef.current) return;
        const input = textareaRef.current.resizableTextArea.textArea;
        const start = input.selectionStart;
        const end = input.selectionEnd;
        const text = input.value;
        const newText = text.slice(0, start) + e.native + text.slice(end);
        setMessageContent(newText);
        setTimeout(() => {
            input.selectionStart = start + e.native.length;
            input.selectionEnd = start + e.native.length;
            input.focus();
        }, 0);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const receiverId = chatRoomFocus?.receiver?.id;
            const id = v4();
            dispatch(
                addMessageAction({
                    id,
                    chatId: getChatRoomId(myId, receiverId),
                    sender: {
                        id: myId,
                    },
                    receiver: {
                        id: receiverId,
                    },
                    content: loadingGif,
                    isSending: true,
                    type: 'IMAGE',
                }),
            );
            const res = await saveMessageTypeImage(receiverId, file, id);
            if (!res) return;
            const content = res?.result?.url;
            sendMessage(id, receiverId, content, 'IMAGE');
        }
    };

    return (
        <>
            {chatRoomFocus.blocked ? (
                <div className="w-full h-[60px] flex justify-center items-center text-red-500">
                    Không thể gửi tin nhắn vì bị chặn
                </div>
            ) : (
                <div className="w-full flex flex-col">
                    <div className="flex-1 border-solid border-b-[1px] min-h-[35px] border-primary flex">
                        <div
                            className="w-[35px] flex items-center justify-center hover:bg-slate-100 cursor-pointer"
                            onClick={() => {
                                if (fileInputRef.current) fileInputRef.current.click();
                            }}
                        >
                            <FileImageOutlined />
                        </div>
                        {!isRecording ? (
                            <div
                                className="w-[35px] flex items-center justify-center hover:bg-slate-100 cursor-pointer"
                                onClick={() => {
                                    setIsRecording(true);
                                }}
                            >
                                <AudioOutlined />
                            </div>
                        ) : (
                            <Tooltip placement="top" title="Hủy">
                                <div
                                    className="w-[35px] flex items-center justify-center hover:bg-slate-100 cursor-pointer"
                                    onClick={() => {
                                        setIsRecording(false);
                                    }}
                                >
                                    <CloseCircleOutlined className="text-primary" />
                                </div>
                            </Tooltip>
                        )}
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept=".jpg, .png, .webp, .gif"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <form
                        className="flex"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessage();
                        }}
                    >
                        {isRecording ? (
                            <VoiceRecorder ref={audioRef} />
                        ) : (
                            <Input.TextArea
                                ref={textareaRef}
                                autoSize={{ minRows: 1, maxRows: 4 }}
                                className="flex-1 outline-none p-[12px] bg-none focus:bg-inherit border-0 focus:outline-none"
                                value={messageContent}
                                onChange={(e) => {
                                    setMessageContent(e.target.value);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key == 'Enter') {
                                        if (e.shiftKey) {
                                            return;
                                        }
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                            ></Input.TextArea>
                        )}
                        <div className="relative w-[45px] min-h-[45px] text-[20px] flex items-center justify-center cursor-pointer hover:bg-slate-100">
                            <SmileOutlined
                                onClick={() => {
                                    setIsOpenEmoji(true);
                                }}
                            />
                            {isOpenEmoji && (
                                <ClickAwayListener
                                    onClickAway={() => {
                                        setIsOpenEmoji(false);
                                    }}
                                >
                                    <div className="absolute bottom-full -right-full">
                                        <div className="pb-[6px]">
                                            <Emoji
                                                setIsOpenEmoji={setIsOpenEmoji}
                                                setMessageContent={setMessageContent}
                                                handleAddEmoji={handleAddEmoji}
                                            />
                                        </div>
                                    </div>
                                </ClickAwayListener>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-[45px] min-h-[45px] text-[20px] flex items-center justify-center cursor-pointer hover:bg-slate-100 text-sky-600"
                        >
                            <SendOutlined />
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}

export default MessageForm;
