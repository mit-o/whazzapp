import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { BsXSquareFill, BsCheckSquareFill } from "react-icons/bs";
import BtnIcon from "../BtnIcon";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editUser } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

const ProfileInput = ({ label, name, userText, blocked }) => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const { tokens } = useSelector((state) => state.auth);
  const accessToken = tokens?.access;
  const yupSchema = yup.object().shape({
    [name]: yup.string().min(3).max(16, "max 16").required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(yupSchema),
  });

  const inputChangeHandler = (data) => {
    if (data[name] !== userText) {
      dispatch(editUser({ data, accessToken }));
    }
    setEdit(false);
  };

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
            {...register(name)}
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
              onClick={handleSubmit((data) => inputChangeHandler(data))}
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
