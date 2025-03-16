import { AudioOutlined, CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import useChatMessageService from '../../services/useChatMessageService';
import useWebsocketService from '../../services/useWebsocketService';
import { useDispatch, useSelector } from 'react-redux';
import { addMessageAction } from '../../redux/action/chatMessageAction';
import useChatRoomService from '../../services/useChatRoomService';
import { chatRoomFocusSelector, userInfoSelector } from '../../redux/selector';
import { v4 } from 'uuid';

function VoiceRecorder(_, ref) {
    const [seconds, setSeconds] = useState(0);
    const [recordedURL, setRecordedURL] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [isDisplaying, setIsDisplaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [audioBlob, setAudioBlob] = useState(null);

    const mediaStream = useRef(null);
    const mediaRecorder = useRef(null);
    const chunks = useRef([]);
    const audioRef = useRef(null);

    const chatRoomFocus = useSelector(chatRoomFocusSelector);
    const myId = useSelector(userInfoSelector)?.id;

    const { saveMessageTypeAudio } = useChatMessageService();
    const { sendMessage } = useWebsocketService();
    const { getChatRoomId } = useChatRoomService();
    const dispatch = useDispatch();

    useImperativeHandle(ref, () => {
        return {
            handleSendAudio: async () => {
                const receiverId = chatRoomFocus?.receiver?.id;
                const id = v4();
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
                        isSending: true,
                        type: 'AUDIO',
                    }),
                );
                const res = await saveMessageTypeAudio(receiverId, audioBlob, id);
                if (!res) return;
                const content = res?.result?.url;
                sendMessage(id, receiverId, content, 'AUDIO');
            },
        };
    });

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const stopRecording = () => {
        setIsRecording(false);
        if (mediaRecorder.current) {
            mediaRecorder.current.stop();
            mediaStream.current.getTracks().forEach((track) => track.stop());
        }
    };

    const startRecording = async () => {
        setRecordedURL('');
        setIsRecording(true);
        setProgress(0);
        try {
            setSeconds(0);
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaStream.current = stream;
            mediaRecorder.current = new MediaRecorder(stream);
            mediaRecorder.current.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunks.current.push(e.data);
                }
            };
            const timer = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);

            mediaRecorder.current.onstop = () => {
                const recordedBlob = new Blob(chunks.current, { type: 'audio/mp3' });
                const url = URL.createObjectURL(recordedBlob);
                setRecordedURL(url);
                setAudioBlob(recordedBlob);

                chunks.current = [];
                clearInterval(timer);
            };

            mediaRecorder.current.start();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // setIsRecording(true);
        startRecording();
        return () => {
            if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
                mediaRecorder.current.stop();
            }
            if (mediaStream.current) {
                mediaStream.current.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    return (
        <div className="flex-1 outline-none bg-primary border-0 mx-[12px] my-[4px] rounded-2xl flex items-center justify-between px-[12px] relative overflow-hidden">
            {!isRecording ? (
                <div></div>
            ) : (
                <div className="aspect-square w-[20px] bg-cyan-400 rounded-full flex justify-center items-center animate-ping-slow">
                    <AudioOutlined className="text-[10px] text-white" />
                </div>
            )}
            {/* Thanh hiển thị tiến trình */}
            <div
                className="absolute left-0 top-0 h-full bg-cyan-200 opacity-50 z-10 "
                style={{ width: `${progress}%` }}
            ></div>
            <div className="flex items-center gap-x-1 absolute right-[12px] z-50">
                {isRecording ? (
                    <div
                        className="rounded-full w-[25px] bg-cyan-400 aspect-square cursor-pointer flex items-center justify-center"
                        onClick={() => {
                            stopRecording();
                        }}
                    >
                        <div className="aspect-square w-[10px] bg-white"></div>
                    </div>
                ) : !isDisplaying ? (
                    <div
                        className="rounded-full w-[25px] bg-cyan-400 aspect-square cursor-pointer flex items-center justify-center"
                        onClick={() => {
                            setIsDisplaying(true);
                            if (audioRef.current) {
                                audioRef.current.play();
                            }
                        }}
                    >
                        <CaretRightOutlined className="text-white" />
                    </div>
                ) : (
                    <div
                        className="rounded-full w-[25px] bg-cyan-400 aspect-square cursor-pointer flex items-center justify-center"
                        onClick={() => {
                            setIsDisplaying(false);
                            if (audioRef.current) {
                                audioRef.current.pause();
                            }
                        }}
                    >
                        <PauseOutlined className="text-white" />
                    </div>
                )}
                <div className="bg-cyan-400 rounded-2xl text-white px-[4px]">{formatTime(seconds)}</div>
            </div>
            {recordedURL && (
                <audio
                    controls
                    src={recordedURL}
                    className="hidden"
                    ref={audioRef}
                    onEnded={() => {
                        setIsDisplaying(false);
                    }}
                    onTimeUpdate={() => {
                        const currentTime = audioRef.current.currentTime;
                        const duration = audioRef.current.duration;
                        setProgress(duration ? (currentTime / duration) * 100 : 0);
                    }}
                />
            )}
        </div>
    );
}

export default forwardRef(VoiceRecorder);
