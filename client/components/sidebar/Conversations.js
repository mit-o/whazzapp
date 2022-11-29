import { useState, useEffect } from "react";
import { API_BASE_URL } from "/utils/api";
import { useSelector, useDispatch } from "react-redux";
import { setActiveChat } from "../../features/chatSlice";
import Conversation from "./Conversation";

const Conversations = () => {
  const dispatch = useDispatch();
  const { user, tokens } = useSelector((state) => state.auth);
  const accessToken = tokens?.access;
  const [activeConversations, setActiveConversations] = useState();

  useEffect(() => {
    const fetchActiveConversations = async () => {
      const res = await fetch(`${API_BASE_URL}/conversations/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();

      setActiveConversations(data);
    };

    fetchActiveConversations();
  }, [user]);

  return (
    <div className="flex flex-col py-3 text-base overflow-y-scroll scrollbar">
      {activeConversations?.map((conversation) => (
        <Conversation
          key={conversation.id}
          participants={conversation.participants}
          lastMessage={conversation.last_message}
          click={() => dispatch(setActiveChat(conversation))}
        />
      ))}
    </div>
  );
};

export default Conversations;
