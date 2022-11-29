import { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { WS_BASE_URL } from "../utils/api";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { setActiveChat } from "../features/chatSlice";
import Seo from "../components/Seo";
import RequireAuth from "../components/RequireAuth";
import Sidebar from "../components/sidebar/Sidebar";
import ChatScreen from "../components/chat/ChatScreen";

const Home = () => {
  const router = useRouter();
  const { isAuthenticated, tokens } = useSelector((state) => state.auth);
  const { activeChat } = useSelector(setActiveChat);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);
  const { readyState, sendJsonMessage } = useWebSocket(
    isAuthenticated && activeChat?.id
      ? `${WS_BASE_URL}/${activeChat.id}/`
      : null,
    {
      queryParams: {
        token: tokens ? tokens.access : null,
      },
      onOpen: () => {
        console.log("Connected!");
        return;
      },
      onClose: () => {
        console.log("Disconnected!");
        return;
      },
      onMessage: (e) => {
        const data = JSON.parse(e.data);
        switch (data.type) {
          case "welcome_message":
            setWelcomeMessage(data.message);
            break;
          case "chat_message_echo":
            setMessageHistory((prev) => prev.concat(data.message));
            break;
          case "last_50_messages":
            setMessageHistory(data.messages.reverse());
            break;
          default:
            console.error("Unknown message type!");
            break;
        }
      },
    }
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Connected",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  return (
    <>
      <Seo title="Whazzapp" />
      <main className="flex">
        <Sidebar />
        <ChatScreen
          sendMessage={sendJsonMessage}
          messageHistory={messageHistory}
        />
      </main>
    </>
  );
};

export default RequireAuth(Home);
