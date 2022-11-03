import { useState, useEffect } from "react";
import { API_BASE_URL } from "/utils/api";
import { useSelector, useDispatch } from "react-redux";
import Conversation from "./Conversation";
import Link from "next/link";
import { refreshToken } from "../../features/authSlice";

const Conversations = () => {
  const { user, tokens } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const accessToken = tokens?.access;
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const fetchUsers = async () => {
        const res = await fetch(`${API_BASE_URL}/users/all/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await res.json();

        if (res.status === 200) {
          setUsers(data);
        } else if (res.status === 401) {
          dispatch(refreshToken());
          fetchUsers();
        } else {
          setError("Couldn't fetch users");
        }
      };
    } catch (err) {
      console.log(err);
      setError("Couldn't fetch users");
    }
  }, [user]);

  const collectConversationSlug = (u) => {
    const namesAlph = [user?.id, u.id].sort();
    return namesAlph.join("__");
  };

  return (
    <>
      <div className="flex flex-col py-3 text-base overflow-y-scroll scrollbar">
        {users
          ?.filter((u) => u.id !== user?.id)
          .map((u) => (
            <Link
              key={u.id}
              href={{
                pathname: "/",
                query: { chat: collectConversationSlug(u) },
              }}
              as={"/"}
            >
              <a>
                <Conversation receiver={u} />
              </a>
            </Link>
          ))}
        {error && <p>{error}</p>}
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

export default Conversations;
