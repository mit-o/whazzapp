import Image from "next/image";
import { FaImage } from "react-icons/fa";

const ProfileAvatar = ({ avatar }) => {
  return (
    <div className="relative w-1/3 rounded-full self-center cursor-pointer group transition">
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
    </div>
  );
};

export default ProfileAvatar;
