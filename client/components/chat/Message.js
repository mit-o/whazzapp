const Message = ({ msg }) => {
  return (
    <div className="m-5 w-fit h-fit text-stone-100">
      <p className="pb-2 font-semibold">Janusz</p>
      <div className="flex gap-5 p-5 bg-secondary rounde items-center">
        <p>{msg}</p>
        <p className="text-sm text-gray-400 font-semibold">
          Fri, 14.10.2022 14:32:14 GMT
        </p>
      </div>
    </div>
  );
};

export default Message;
