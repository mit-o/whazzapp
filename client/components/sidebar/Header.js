import { useState } from "react";
import { MdMessage, MdArrowBack } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";
import Dropdown from "../Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authSlice";

const Header = ({ openNewConversation, isNewConversationOpen }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const actions = [
    {
      action: "New group",
      func: () => openNewConversation(true),
    },
    {
      action: "Settings",
      func: () => console.log("Settings"),
    },
    {
      action: "Logout",
      func: () => dispatch(logout()),
    },
  ];

  const openDropdownHandler = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className="flex p-5 justify-between bg-secondary text-stone-100">
      <div className="w-10 h-10 rounded-full cursor-pointer">
        <Image
          layout="responsive"
          width="100%"
          height="100%"
          className="rounded-full object-cover"
          src={user?.avatar || "/avatar.png"}
          alt="avatar"
        />
      </div>
      <div className="flex space-x-2.5">
        <div
          className="p-2 rounded-full cursor-pointer"
          onClick={() => openNewConversation(!isNewConversationOpen)}
        >
          <span className="text-2xl">
            {isNewConversationOpen ? <MdArrowBack /> : <MdMessage />}
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
          <Dropdown actions={actions} isOpen={isDropdownOpen} />
        </div>
      </div>
    </div>
  );
};

export default Header;
