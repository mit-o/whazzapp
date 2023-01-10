import Image from "next/image";
import { useSelector } from "react-redux";
import { selectActiveChat } from "../../features/chatSlice";

const Conversation = ({ id, name, avatar, lastMessage, click }) => {
  const activeChat = useSelector(selectActiveChat);
  const isActive = activeChat?.id === id;

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleDateString();
  };

  return (
    <div
      className={`flex flex-row min-h-[150px] items-center cursor-pointer px-5 py-3 gap-x-5 transition-all duration-300 ${
        isActive
          ? "bg-dark border-l-8 border-l-accent"
          : "bg-light hover:bg-accent"
      } border-lightextra border shadow-lg rounded-lg`}
      onClick={click}
    >
      <div className="w-14 h-14 rounded-full">
        <Image
          src={avatar}
          alt="avatar"
          layout="responsive"
          width="100%"
          height="100%"
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col w-full py-2 border-secondary text-gray">
        <div className="flex flex-row w-full justify-between">
          <p
            className={`${
              isActive ? "text-light" : "text-dark"
            } font-extrabold text-lg`}
          >
            {name}
          </p>
          <p className="text-md font-semibold">
            {lastMessage?.timestamp ? formatTime(lastMessage.timestamp) : null}
          </p>
        </div>
        <div
          className={`text-sm font-medium ${
            isActive ? "text-gray" : "text-dark"
          }`}
        >
          {lastMessage?.content}
        </div>
      </div>
    </div>
  );
};

export default Conversation;
