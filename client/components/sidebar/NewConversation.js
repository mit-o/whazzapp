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
    <div className="flex flex-col py-3 text-base overflow-y-scroll scrollbar">
      {appendingUsers.length > 0 && (
        <button
          onClick={createConversationHandler}
          className="mx-5 my-3 border rounded border-transparent bg-teal-300 p-3 text-primary font-medium hover:bg-teal-400"
        >
          Create chat
        </button>
      )}
      {users?.map((user) => (
        <div
          key={user.id}
          className={`flex items-center cursor-pointer px-5 py-3 my-1 gap-x-5 hover:bg-secondary ${
            appendingUsers.includes(user.id) ? "bg-secondary" : null
          }`}
          onClick={() => manageUsersHandler(user.id)}
        >
          <div className="w-14 h-14 rounded-full">
            <Image
              src="/avatar.png"
              layout="responsive"
              width="100%"
              height="100%"
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex justify-between w-full py-2  text-stone-200 font-medium">
            <p>{user.email}</p>

            {appendingUsers.includes(user.id) ? (
              <span className="text-2xl text-teal-300">
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
