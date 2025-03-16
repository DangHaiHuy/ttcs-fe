import useHttpPrivate from '../hooks/useHttpPrivate';

function useChatRoomService() {
    const httpRequestPrivate = useHttpPrivate();

    const getMyChatRooms = async () => {
        try {
            const res = await httpRequestPrivate.get('/api/v1/chat-room');
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const getChatRoomId = (senderId, receiverId) => {
        if (senderId < receiverId) return `${senderId}_${receiverId}`;
        else return `${receiverId}_${senderId}`;
    };

    return { getMyChatRooms, getChatRoomId };
}

export default useChatRoomService;
