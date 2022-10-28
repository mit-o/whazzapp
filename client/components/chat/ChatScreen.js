import { useState, useEffect, useRef } from "react";
import {
  BsThreeDotsVertical,
  BsSearch,
  BsEmojiSmile,
  BsPaperclip,
  BsMicFill,
} from "react-icons/bs";
import Image from "next/image";
import Dropdown from "../Dropdown";
import Message from "./Message";

const ChatScreen = ({ messageHistory, sendMessage }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [message, setMessage] = useState("");
  const messageRef = useRef(null);

  const openDropdownHandler = () => {
    setIsDropdownOpen((prevState) => !prevState);
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
    <div className="flex flex-col w-full lg:w-[calc(100%-400px)] h-full bg-primary self-end">
      {/* header */}
      <div className="flex p-5 w-full h-20 justify-between items-center bg-secondary text-stone-100">
        <div className="flex space-x-2.5 items-center">
          <div className="w-10 h-10 rounded-full cursor-pointer">
            <Image
              layout="responsive"
              width="100%"
              height="100%"
              className="rounded-full object-cover"
              src="/avatar.jpeg"
            />
          </div>
          <div>
            <p className="text-base font-semibold">xxx</p>
            <p className="text-sm text-gray-400">last seen today at 12:40 am</p>
          </div>
        </div>
        <div className="flex space-x-2.5">
          <div className="p-2 rounded-full cursor-pointer">
            <span className="text-2xl">
              <BsSearch />
            </span>
          </div>
          <div
            className={`relative p-2 rounded-full cursor-pointer ${
              isDropdownOpen ? "bg-primary" : null
            }`}
            onClick={openDropdownHandler}
          >
            <span className="text-2xl">
              <BsThreeDotsVertical />
            </span>
            <Dropdown isOpen={isDropdownOpen} />
          </div>
        </div>
      </div>

      {/* messages */}
      <div className="flex flex-col grow w-full p-5 gap-2.5">
        {messageHistory?.map((message, idx) => (
          <Message key={idx} msg={message.message} name={message.name} />
        ))}
      </div>

      {/* input */}
      <div className="flex p-5 w-full bg-secondary text-stone-100 items-center">
        <div className="flex space-x-2.5">
          <div className="p-2 rounded-full cursor-pointer">
            <span className="text-2xl">
              <BsEmojiSmile />
            </span>
          </div>
          <div className="p-2 rounded-full cursor-pointer">
            <span className="text-2xl">
              <BsPaperclip />
            </span>
          </div>
        </div>
        <form
          className="flex grow mx-5 max-h-32 bg-primary opacity-70 rounded"
          onSubmit={sendMessageHandler}
        >
          <textarea
            className="grow max-h-32 shadow p-3 appearance-none text-stone-100 bg-transparent outline-none focus:outline-none focus:shadow-outline"
            placeholder="Type a message"
            name="message"
            ref={messageRef}
            type="text"
            value={message}
            onChange={handleChangeMessage}
          />
          <button
            type="submit"
            className="border rounded bg-stone-100 p-3 text-primary"
          >
            Send
          </button>
        </form>
        <div className="p-2 rounded-full cursor-pointer">
          <span className="text-2xl">
            <BsMicFill />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
