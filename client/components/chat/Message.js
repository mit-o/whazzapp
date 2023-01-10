import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const { user } = useSelector((state) => state.auth);
  const isSender = user?.id === message.sender.id;

  const formatTime = (time) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const date = new Date(time);
    const formatedTimestamp = date.toLocaleTimeString().slice(0, 5);
    const formatedDate = date.toLocaleDateString();

    if (date.toDateString() === today.toDateString()) {
      return formatedTimestamp;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday " + formatedTimestamp;
    } else {
      return formatedDate + " " + formatedTimestamp;
    }
  };

  return (
    <div
      className={`flex flex-col h-fit max-w-[50%] ${
        isSender ? "self-end items-end" : null
      }`}
    >
      <div
        className={`flex w-fit px-5 py-4 rounded-lg items-center shadow-lg border-gray ${
          isSender ? "bg-accent text-light" : "bg-light text-dark"
        }`}
      >
        <p className="break-all font-medium">{message.content}</p>
      </div>
      <div
        className={`flex gap-2 pt-3 px-3 items-center text-sm font-bold text-gray ${
          isSender ? "justify-end" : "justify-start"
        }`}
      >
        <p>{formatTime(message.timestamp)}</p>
      </div>
    </div>
  );
};

export default Message;
