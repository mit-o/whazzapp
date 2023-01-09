import { useState } from "react";
import Header from "./Header";
import Conversations from "./Conversations";
import NewConversation from "./NewConversation";
import Profile from "../profile/Profile";
import Frame from "../Frame";

const Sidebar = () => {
  const [isNewConversationOpen, setIsNewConversationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <Frame>
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
    </Frame>
  );
};

export default Sidebar;
