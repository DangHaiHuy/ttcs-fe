import { useSelector } from 'react-redux';
import { websocketClientSelector } from '../redux/selector';

function useWebsocketService() {
    const client = useSelector(websocketClientSelector);
    const sendMessage = (id, receiverId, content, type) => {
        client.publish({
            destination: '/app/chat',
            body: JSON.stringify({
                id,
                receiverId,
                content,
                type,
            }),
        });
    };

    return { sendMessage };
}

export default useWebsocketService;
