import { useState } from "react";
import { MdOutlineDoubleArrow } from "react-icons/md";
import Header from "./Header";
import Conversations from "./Conversations";
import NewConversation from "./NewConversation";
import useDetectScreen from "../../hooks/useDetectScreen";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNewConversationOpen, setIsNewConversationOpen] = useState(false);
  const isSmallScreen = useDetectScreen(1024);

  const openSidebarClasses = `fixed lg:relative h-full flex flex-col bg-primary w-5/6 lg:w-[400px] border-r border-stone-100/20 z-50 ${
    isSmallScreen
      ? isSidebarOpen
        ? "translate-x-0"
        : "-translate-x-full"
      : null
  } transition-transform duration-300`;

  const openSidebarBtnClasses =
    "absolute top-2/4 right-[-30px] h-[30px] w-[30px] translate-y-1/2 rounded-full cursor-pointer text-stone-400";

  const openSidebarBtn = isSmallScreen && (
    <span
      className={openSidebarBtnClasses}
      onClick={() => setIsSidebarOpen((prev) => !prev)}
    >
      <MdOutlineDoubleArrow
        className={`${isSidebarOpen ? "rotate-180" : "rotate-0"} text-3xl`}
      />
    </span>
  );

  return (
    <div className={openSidebarClasses}>
      <Header
        openNewConversation={setIsNewConversationOpen}
        isNewConversationOpen={isNewConversationOpen}
      />
      {isNewConversationOpen ? (
        <NewConversation open={setIsNewConversationOpen} />
      ) : (
        <Conversations />
      )}
      {openSidebarBtn}
    </div>
  );
};

export default Sidebar;
