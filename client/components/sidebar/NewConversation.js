import { useState } from "react";
import Image from "next/image";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { createConversation } from "../../features/chatSlice";
import useFetch from "../../hooks/useFetch";

const NewConversation = ({ open }) => {
  const dispatch = useDispatch();
  const { tokens } = useSelector((state) => state.auth);
  const accessToken = tokens?.access;
  const [appendingUsers, setAppendingUsers] = useState([]);
  const { data: users, error, loading } = useFetch("/users/");

  const manageUsersHandler = (id) => {
    if (appendingUsers.includes(id)) {
      setAppendingUsers(appendingUsers.filter((user) => user !== id));
    } else {
      setAppendingUsers((prev) => [...prev, id]);
    }
  };

  const createConversationHandler = () => {
    dispatch(createConversation({ users: appendingUsers, accessToken }));
    open(false);
  };

  return (
    <div className="flex flex-col p-3 gap-5 text-base overflow-y-scroll scrollbar">
      {appendingUsers.length > 0 && (
        <button
          onClick={createConversationHandler}
          className="border rounded border-transparent bg-accent p-3 my-2 text-light font-medium hover:bg-accentplus"
        >
          Create chat
        </button>
      )}
      {users?.map((user) => (
        <div
          key={user.id}
          className={`flex items-center cursor-pointer px-5 gap-3 py-2 shadow-lg border border-lightextra rounded-lg ${
            appendingUsers.includes(user.id) ? "bg-accent text-light" : null
          }`}
          onClick={() => manageUsersHandler(user.id)}
        >
          <div className="w-14 h-14 rounded-full">
            <Image
              src={user.avatar}
              alt="avatar"
              layout="responsive"
              width="100%"
              height="100%"
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex justify-between w-full py-2 font-extrabold">
            <p>{user.display_name}</p>

            {appendingUsers.includes(user.id) ? (
              <span className="text-2xl text-light">
                <MdCheckBox />
              </span>
            ) : (
              <span className="text-2xl opacity-10">
                <MdCheckBoxOutlineBlank />
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewConversation;
