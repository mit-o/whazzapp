import Image from "next/image";

const Contact = ({ contact }) => {
  return (
    <div className="flex flex-row items-center cursor-pointer px-5 py-3 gap-x-5 hover:bg-secondary">
      <div className="w-14 h-14 rounded-full">
        <Image
          src={contact.avatar}
          layout="responsive"
          width="100%"
          height="100%"
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col w-full border-b py-2 border-secondary text-stone-400">
        <div className="flex flex-row w-full justify-between">
          <p className="text-stone-100 font-medium">{contact.name}</p>
          <p className="text-xs">{contact.last_date}</p>
        </div>
        <div className="text-sm">{contact.last_message}</div>
      </div>
    </div>
  );
};

export default Contact;
