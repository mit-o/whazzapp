import { useState } from "react";
import { MdOutlineDoubleArrow } from "react-icons/md";
import Header from "./Header";
import Conversations from "./Conversations";
import NewConversation from "./NewConversation";
import Profile from "../profile/Profile";
import BtnIcon from "../BtnIcon";
import useDetectScreen from "../../hooks/useDetectScreen";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNewConversationOpen, setIsNewConversationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const isSmallScreen = useDetectScreen(1024);

  const openSidebarClasses = `fixed lg:relative h-full flex flex-col bg-lightplus w-5/6 lg:w-[500px] border-r border-stone-300/30 z-50 ${
    isSmallScreen
      ? isSidebarOpen
        ? "translate-x-0"
        : "-translate-x-full"
      : null
  } transition-transform duration-300`;

  const openSidebarBtnClasses =
    "absolute top-2/4 right-[-30px] h-[30px] w-[30px] translate-y-1/2 rounded-full text-stone-400";

  const openSidebarBtn = isSmallScreen && (
    <BtnIcon
      icon={
        <MdOutlineDoubleArrow
          className={`${isSidebarOpen ? "rotate-180" : "rotate-0"} text-3xl`}
        />
      }
      btnClasses={openSidebarBtnClasses}
      onClick={() => setIsSidebarOpen((prev) => !prev)}
    />
  );

  return (
    <div className={openSidebarClasses}>
      <Header
        openNewConversation={setIsNewConversationOpen}
        isNewConversationOpen={isNewConversationOpen}
        openProfile={setIsProfileOpen}
        isProfileOpen={isProfileOpen}
      />
      {isNewConversationOpen && (
        <NewConversation open={setIsNewConversationOpen} />
      )}
      {isProfileOpen && <Profile />}
      {!isProfileOpen && !isNewConversationOpen && <Conversations />}
      {openSidebarBtn}
    </div>
  );
};

export default Sidebar;
