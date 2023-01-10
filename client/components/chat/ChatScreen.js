import { useState } from "react";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import ChatSettings from "./ChatSettings";
import Frame from "../Frame";

const ChatScreen = ({ messageHistory, sendMessage }) => {
  const [areSettingsOpen, setAreSettingsOpen] = useState(false);

  return (
    <div className="relative flex w-full h-full">
      <div className="flex flex-col w-full">
        <ChatHeader openSettings={setAreSettingsOpen} />
        <Messages messageHistory={messageHistory} />
        <MessageInput sendMessage={sendMessage} />
      </div>
      {areSettingsOpen && (
        <Frame
          frameClassName="fixed lg:relative h-full flex flex-col bg-lightplus w-full p-5 lg:min-w-[400px] lg:max-w-[400px] xl:min-w-[500px] xl:max-w-[500px] lg:border-l border-stone-300/30 z-50"
          clean
        >
          <ChatSettings openSettings={setAreSettingsOpen} />
        </Frame>
      )}
    </div>
  );
};

export default ChatScreen;
