import { useSelector } from "react-redux";
import { selectActiveChat } from "../../features/chatSlice";
import { BsSearch } from "react-icons/bs";
import Image from "next/image";
import DropdownBtn from "../DropdownBtn";

const ChatHeader = ({ openSettings }) => {
  const activeChat = useSelector(selectActiveChat);
  const isPrivate = activeChat.private;

  const privateActions = [
    {
      action: "Settings",
      func: () => openSettings((prev) => !prev),
    },
    {
      action: "Remove",
      func: () => console.log("Remove"),
    },
  ];

  const groupActions = [
    {
      action: "Participants",
      func: () => console.log("Participants"),
    },
    {
      action: "Settings",
      func: () => openSettings((prev) => !prev),
    },
    {
      action: "Leave",
      func: () => console.log("Leave"),
    },
  ];

  return (
    <div className="relative flex p-5 w-full h-20 justify-between items-center text-stone-400 border-b border-stone-300/30">
      <div className="flex space-x-2.5 items-center">
        <div className="w-10 h-10 rounded-full cursor-pointer">
          <Image
            layout="responsive"
            width="100%"
            height="100%"
            className="rounded-full object-cover"
            src={activeChat.avatar}
            alt="avatar"
          />
        </div>
        <div>
          <p className="text-base font-extrabold text-dark">
            {activeChat.name || ""}
          </p>
        </div>
      </div>
      <div className="flex space-x-2.5">
        <div className="p-2 rounded-full cursor-pointer">
          <span className="text-2xl">
            <BsSearch />
          </span>
        </div>
        <DropdownBtn actions={isPrivate ? privateActions : groupActions} />
      </div>
    </div>
  );
};

export default ChatHeader;
