import Message from "./Message";

const Messages = ({ messageHistory }) => {
  return (
    <div className="flex flex-col grow w-full p-5 gap-5 overflow-y-auto">
      {messageHistory.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

export default Messages;
