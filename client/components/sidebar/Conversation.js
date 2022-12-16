import Image from "next/image";

const Conversation = ({ click, lastMessage, name }) => {
  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleDateString();
  };

  return (
    <div
      className="flex flex-row items-center cursor-pointer px-5 py-3 gap-x-5 hover:bg-secondary"
      onClick={click}
    >
      <div className="w-14 h-14 rounded-full">
        <Image
          src="/avatar.png"
          alt="avatar"
          layout="responsive"
          width="100%"
          height="100%"
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col w-full border-b py-2 border-secondary text-stone-400">
        <div className="flex flex-row w-full justify-between">
          <p className="text-stone-100 font-medium">{name}</p>
          <p className="text-xs">
            {lastMessage?.timestamp ? formatTime(lastMessage.timestamp) : null}
          </p>
        </div>
        <div className="text-sm">{lastMessage?.content}</div>
      </div>
    </div>
  );
};

export default Conversation;
