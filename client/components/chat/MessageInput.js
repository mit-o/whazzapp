import { useState, useEffect, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
const MessageInput = ({ sendMessage }) => {
  const [message, setMessage] = useState("");
  const messageRef = useRef(null);

  const onKeyUpHandler = (e) => {
    if ((e.key === "Enter" || e.key === "NumpadEnter") && !e.shiftKey) {
      sendMessageHandler(e);
    }
  };

  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    sendMessage({
      type: "chat_message",
      message,
    });
    setMessage("");
  };

  useEffect(() => {
    if (messageRef && messageRef.current) {
      messageRef.current.style.height = "0px";
      const scrollHeight = messageRef.current.scrollHeight;
      messageRef.current.style.height = scrollHeight + "px";
    }
  }, [message]);

  return (
    <div className="p-5 w-full space-x-2.5 border-t border-stone-300/30 items-center">
      <form
        className="flex items-center grow lg:mx-5 max-h-32 rounded"
        onSubmit={sendMessageHandler}
        onKeyUp={onKeyUpHandler}
      >
        <textarea
          className="grow max-h-32 py-4 px-6 appearance-none rounded-tl-lg rounded-bl-lg text-dark bg-[#f7f5f5] outline-none focus:outline-none focus:shadow-outline"
          placeholder="Type a message here..."
          name="message"
          ref={messageRef}
          type="text"
          value={message}
          onChange={handleChangeMessage}
        />
        <button
          type="submit"
          className="p-5 ml-[-50px] rounded-full text-light bg-accent hover:bg-accentplus"
        >
          <span className="text-2xl">
            <FaPaperPlane />
          </span>
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
