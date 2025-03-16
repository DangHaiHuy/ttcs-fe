import MessageBody from './MessageBody';
import MessageForm from './MessageForm';
import MessageHeader from './MessageHeader';

function ChatArea() {
    return (
        // w-[750px]
        <div className="flex-1 flex flex-col shadow-md h-screen"> 
            <MessageHeader />
            <MessageBody/>
            <MessageForm/>
        </div>
    );
}

export default ChatArea;
