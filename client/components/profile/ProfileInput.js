import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { BsXSquareFill, BsCheckSquareFill } from "react-icons/bs";
import BtnIcon from "../BtnIcon";

const ProfileInput = ({ label, userText, blocked }) => {
  const [edit, setEdit] = useState(false);
  return (
    <div>
      <h4 className="text-accent font-extrabold">{label}</h4>
      <div className="flex justify-between text-lg font-extrabold gap-2">
        {edit ? (
          <input
            type="text"
            placeholder={userText}
            defaultValue={userText}
            className="border-b border-gray w-full outline-none"
          />
        ) : (
          <p className="text-dark">{userText}</p>
        )}
        {blocked ? null : edit ? (
          <div className="flex gap-1">
            <BtnIcon
              iconClasses="text-red-600 text-xl"
              icon={<BsXSquareFill />}
              onClick={() => setEdit(false)}
            />
            <BtnIcon
              iconClasses="text-green-600 text-xl"
              icon={<BsCheckSquareFill />}
            />
          </div>
        ) : (
          <BtnIcon
            iconClasses="text-gray text-xl"
            icon={<FaPen />}
            onClick={() => setEdit(true)}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileInput;
