import Image from "next/image";

const Conversation = ({ click, lastMessage, name, avatar }) => {
  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleDateString();
  };

  return (
    <div
      className="flex flex-row bg-light border border-lightextra min-h-[150px] items-center cursor-pointer px-5 py-3 gap-x-5 hover:bg-accent shadow-lg rounded-lg"
      onClick={click}
    >
      <div className="w-14 h-14 rounded-full">
        <Image
          src={avatar}
          alt="avatar"
          layout="responsive"
          width="100%"
          height="100%"
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col w-full py-2 border-secondary text-gray">
        <div className="flex flex-row w-full justify-between">
          <p className="text-dark font-extrabold text-lg">{name}</p>
          <p className="text-md font-semibold">
            {lastMessage?.timestamp ? formatTime(lastMessage.timestamp) : null}
          </p>
        </div>
        <div className="text-sm font-medium text-dark">
          {lastMessage?.content}
        </div>
      </div>
    </div>
  );
};

export default Conversation;
