import Image from "next/image";
import Contact from "./Contact";

const contactsData = [
  {
    avatar: "/avatar.jpeg",
    name: "Janusz",
    last_message: "30$ i jestem dzisiaj",
    last_date: "26/9/2022",
  },
  {
    avatar: "/avatar.png",
    name: "Zbysiu",
    last_message: "Hehe",
    last_date: "25/9/2022",
  },
  {
    avatar: "/girl-avatar.jpeg",
    name: "Ania",
    last_message: "Robi wrażenie",
    last_date: "25/9/2022",
  },
];

const ContactList = () => {
  return (
    <>
      <div className="flex flex-col py-3 text-base overflow-y-scroll scrollbar">
        {contactsData.map((contact) => (
          <Contact key={contact.name} contact={contact} />
        ))}
      </div>
      <style jsx>
        {`
          .scrollbar::-webkit-scrollbar {
            width: 8px;
          }

          .scrollbar::-webkit-scrollbar-track {
            background-color: #233138;
            border-radius: 10px;
          }

          .scrollbar::-webkit-thumb {
            background-color: #121b21;
            border-radius: 10px;
          }

          .scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #121b21;
          }
        `}
      </style>
    </>
  );
};

export default ContactList;
