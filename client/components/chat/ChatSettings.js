import { useSelector } from "react-redux";
import { selectActiveChat } from "../../features/chatSlice";
import { BsXSquare, BsArrowRightShort } from "react-icons/bs";
import Avatar from "../Avatar";
import BtnIcon from "../BtnIcon";

const ChatSettings = ({ openSettings }) => {
  const activeChat = useSelector(selectActiveChat);
  const isPrivate = activeChat?.private;

  const getFirstNames = activeChat?.participants
    .slice(0, 4)
    .map((participant) => participant.display_name)
    .join(" ");

  return (
    <div className="flex flex-col items-center p-2 gap-7 text-base text-center">
      <BtnIcon
        btnClasses="self-end"
        iconClasses="text-gray text-3xl"
        icon={<BsXSquare />}
        onClick={() => openSettings(false)}
      />
      <Avatar src={activeChat?.avatar} className="w-40 h-40 mt-3" />
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-extrabold">{activeChat?.name}</h3>
        <p className="text-gray font-light">
          {isPrivate &&
            (activeChat?.description ||
              "Hello there! How are you doing today?")}
        </p>
      </div>
      {!isPrivate && (
        <div className="flex items-center justify-between w-full bg-lightextra rounded-lg border-gray p-5 text-left cursor-pointer hover:shadow-md transition-all duration-300">
          <div className="flex flex-col overflow-hidden">
            <h3 className="text-lg font-semibold text-accent">
              {activeChat?.participants.length} chat members
            </h3>
            <p className="truncate text-gray text-md font-semibold">
              {getFirstNames}
            </p>
          </div>
          <span className="text-3xl text-accent">
            <BsArrowRightShort />
          </span>
        </div>
      )}
      <div className="flex w-full"></div>
    </div>
  );
};

export default ChatSettings;
