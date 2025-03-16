import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MessageReceiver from './MessageReceiver';
import MesssageSender from './MessageSender';
import useChatMessageService from '../../services/useChatMessageService';
import { useDispatch, useSelector } from 'react-redux';
import { chatMessageSelector, chatRoomFocusSelector, userInfoSelector } from '../../redux/selector';
import Loading from '../loading/Loading';
import { addMessageArrayAction, resetMessageAction } from '../../redux/action/chatMessageAction';
import ModalImage from '../modal/ModalImage';

function MessageBody({ heightMessageForm }) {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [loadingMessage, setLoadingMessage] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [openModalImage, setOpenModalImage] = useState(false);
    const [source, setSource] = useState('');
    const [type, setType] = useState('TEXT');

    const { getListMessage } = useChatMessageService();

    const messages = useSelector(chatMessageSelector);
    const chatRoomFocus = useSelector(chatRoomFocusSelector);
    const myId = useSelector(userInfoSelector)?.id;

    const dispatch = useDispatch();

    const observe = useRef();
    const lastMessageElementRef = useCallback(
        (node) => {
            if (loadingMessage || loading) return;
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
        [loadingMessage, hasMore],
    );

    useEffect(() => {
        setPage(1);
        dispatch(resetMessageAction());
        if (isFirstRender) setIsFirstRender(false);
        else setIsReset((prev) => !prev);
    }, [chatRoomFocus?.receiver?.id]);

    const allMessages = useMemo(() => {
        return messages.filter((message) => {
            return message.chatId === chatRoomFocus?.chatId;
        });
    }, [messages]);

    const handleClickImage = useCallback((message, e) => {
        setOpenModalImage(true);
        setSource(message.content);
        setType(message.type);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (page !== 1) setLoadingMessage(true);
            else setLoading(true);
            const receiverId = chatRoomFocus?.receiver?.id;
            const res = await getListMessage(receiverId || '', page);
            if (!res) {
                setLoadingMessage(false);
                setLoading(false);
                return;
            }
            setHasMore(res?.result?.items.length > 0);
            setLoadingMessage(false);
            setLoading(false);
            dispatch(addMessageArrayAction(res.result.items));
        };
        fetchData();
    }, [page, isReset]);
    return (
        <div
            className="bg-slate-300 flex-1 flex flex-col-reverse overflow-y-auto
                    [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                    dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 relative bg-sky-50 pt-[6px]"
            // style={{ maxHeight: `calc(100vh - 60px - ${heightMessageForm}px)` }}
        >
            {loading ? (
                <div className="relative w-full h-full">
                    <Loading fontSize={30}></Loading>
                </div>
            ) : (
                <>
                    {allMessages.map((message, index) => {
                        if (message.sender.id === myId) {
                            return (
                                <div key={index}>
                                    {allMessages.length === index + 1 ? (
                                        <div ref={lastMessageElementRef}>
                                            <MessageReceiver
                                                index={index}
                                                message={message}
                                                isSending={message.isSending ? true : false}
                                                handleClickImage={handleClickImage}
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <MessageReceiver
                                                index={index}
                                                message={message}
                                                isSending={message.isSending ? true : false}
                                                handleClickImage={handleClickImage}
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        }
                        return (
                            <div key={index}>
                                {allMessages.length === index + 1 ? (
                                    <div ref={lastMessageElementRef}>
                                        <MesssageSender
                                            index={index}
                                            isRenderAvatar={
                                                index === 0
                                                    ? true
                                                    : allMessages[index].sender.id != allMessages[index - 1].sender.id
                                            }
                                            message={message}
                                            handleClickImage={handleClickImage}
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <MesssageSender
                                            index={index}
                                            isRenderAvatar={
                                                index === 0
                                                    ? true
                                                    : allMessages[index].sender.id != allMessages[index - 1].sender.id
                                            }
                                            message={message}
                                            handleClickImage={handleClickImage}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </>
            )}
            {loadingMessage && (
                <div className="relative w-full min-h-[20px] mb-[6px]">
                    <Loading fontSize={20}></Loading>
                </div>
            )}
            {openModalImage && <ModalImage source={source} type={type} setOpenModalImage={setOpenModalImage} />}
        </div>
    );
}

export default MessageBody;
