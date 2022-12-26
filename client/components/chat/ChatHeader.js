import { useSelector } from "react-redux";
import { selectActiveChat } from "../../features/chatSlice";
import { BsSearch } from "react-icons/bs";
import Image from "next/image";
import DropdownBtn from "../DropdownBtn";

const ChatHeader = () => {
  const activeChat = useSelector(selectActiveChat);

  const actions = [
    {
      action: "Add to conversation",
      func: () => console.log("Add to conversation"),
    },
    {
      action: "Settings",
      func: () => console.log("Settings"),
    },
    {
      action: "Leave",
      func: () => console.log("Leave"),
    },
  ];

  return (
    <div className="flex p-5 w-full h-20 justify-between items-center text-stone-400 border-b border-stone-300/30">
      <div className="flex space-x-2.5 items-center">
        <div className="w-10 h-10 rounded-full cursor-pointer">
          <Image
            layout="responsive"
            width="100%"
            height="100%"
            className="rounded-full object-cover"
            src={activeChat.avatar || "/group-default.png"}
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
        <DropdownBtn actions={actions} />
      </div>
    </div>
  );
};

export default ChatHeader;
