import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const { user } = useSelector((state) => state.auth);
  const isSender = user?.email === message.sender.email;

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString().slice(0, 5);
  };

  return (
    <div
      className={`mx-10 my-5 w-fit h-fit text-stone-100 max-w-[50%] ${
        isSender ? "self-end" : null
      }`}
    >
      <p className="pb-2 font-semibold">
        {isSender ? null : message.sender.email}
      </p>
      <div
        className={`flex gap-5 p-5 bg-secondary rounded items-center ${
          isSender ? "bg-teal-900" : "bg-secondary"
        }`}
      >
        <p className="break-all">{message.content}</p>
        <p className="text-sm text-gray-400 font-semibold">
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default Message;
