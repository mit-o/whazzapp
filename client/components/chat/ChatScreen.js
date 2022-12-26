import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

const ChatScreen = ({ messageHistory, sendMessage }) => {
  return (
    <div className="flex flex-col w-full lg:w-[calc(100%-500px)] h-full self-end">
      <ChatHeader />
      <Messages messageHistory={messageHistory} />
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
};

export default ChatScreen;
