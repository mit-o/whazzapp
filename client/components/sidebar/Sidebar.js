import { useState } from "react";
import Header from "./Header";
import Conversations from "./Conversations";
import NewConversation from "./NewConversation";
import Profile from "../profile/Profile";
import Frame from "../Frame";

const Sidebar = () => {
  const [isFrameOpen, setIsFrameOpen] = useState(false);
  const [isNewConversationOpen, setIsNewConversationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <Frame isFrameOpen={isFrameOpen} openFrame={setIsFrameOpen}>
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
