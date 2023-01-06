import { useSelector } from "react-redux";
import ProfileAvatar from "./ProfileAvatar";
import ProfileInput from "./ProfileInput";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col p-6 gap-7 text-base">
      <ProfileAvatar avatar={user?.avatar} />
      <ProfileInput label="Display name:" userText={user?.display_name} />
      <ProfileInput label="Email:" userText={user?.email} blocked />
    </div>
  );
};

export default Profile;
