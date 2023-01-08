import { useRef } from "react";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import { editUser } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";

const ProfileAvatar = ({ avatar }) => {
  const dispatch = useDispatch();
  const avatarRef = useRef();
  const { tokens } = useSelector((state) => state.auth);
  const accessToken = tokens?.access;

  const avatarChangeHandler = (file) => {
    if (!file) return;
    if (file.size > 1024 * 1024 * 2) return;

    const data = new FormData();
    data.append("upload_avatar", file);
    dispatch(editUser({ data, accessToken }));
    avatarRef.current.files = null;
  };

  return (
    <div
      className="relative w-1/3 rounded-full self-center cursor-pointer group transition"
      onClick={() => avatarRef.current.click()}
    >
      <Image
        src={avatar}
        alt="avatar"
        layout="responsive"
        width="100%"
        height="100%"
        className="rounded-full object-cover"
      />
      <div className="absolute inset-0 hidden flex-col items-center justify-center w-full h-full bg-dark rounded-full text-light group-hover:flex group-hover:opacity-80">
        <span className="text-2xl">
          <FaImage />
        </span>
        <p className="font-medium">Change avatar</p>
      </div>
      <input
        type="file"
        id="upload_avatar"
        accept="image/*"
        className="hidden"
        ref={avatarRef}
        onChange={(e) => avatarChangeHandler(e.target.files[0])}
      />
    </div>
  );
};

export default ProfileAvatar;
