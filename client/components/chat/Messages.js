import { useEffect, useRef } from "react";
import Message from "./Message";

const Messages = ({ messageHistory }) => {
  const messagesRef = useRef(null);
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messageHistory]);
  return (
    <div
      className="flex flex-col grow w-full p-5 gap-5 overflow-y-auto"
      ref={messagesRef}
    >
      {messageHistory.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

export default Messages;
