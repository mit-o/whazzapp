import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveChat } from "../../features/chatSlice";
import { getConversations } from "../../features/chatSlice";
import Conversation from "./Conversation";

const Conversations = () => {
  const dispatch = useDispatch();
  const { tokens } = useSelector((state) => state.auth);
  const { conversations } = useSelector((state) => state.chat);
  const accessToken = tokens?.access;

  useEffect(() => {
    dispatch(getConversations({ accessToken }));
  }, [accessToken]);

  return (
    <div className="flex flex-col py-3 text-base overflow-y-scroll scrollbar">
      {conversations?.map((conversation) => (
        <Conversation
          key={conversation.id}
          lastMessage={conversation.last_message}
          name={conversation.name}
          click={() => dispatch(setActiveChat(conversation))}
        />
      ))}
    </div>
  );
};

export default Conversations;
