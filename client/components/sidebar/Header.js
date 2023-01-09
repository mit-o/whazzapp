import { MdMessage, MdArrowBack } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authSlice";
import DropdownBtn from "../DropdownBtn";
import BtnIcon from "../BtnIcon";
import Avatar from "../Avatar";

const Header = ({
  openNewConversation,
  isNewConversationOpen,
  openProfile,
  isProfileOpen,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const openProfileHandler = () => {
    if (isNewConversationOpen) {
      openNewConversation(false);
    }
    openProfile((prev) => !prev);
  };

  const openNewConversationHandler = () => {
    if (isProfileOpen) {
      openProfile(false);
    }
    openNewConversation((prev) => !prev);
  };

  const actions = [
    {
      action: "New group",
      func: openNewConversationHandler,
    },
    {
      action: "Settings",
      func: openProfileHandler,
    },
    {
      action: "Logout",
      func: () => dispatch(logout()),
    },
  ];

  return (
    <div className="flex p-5 justify-between text-stone-400">
      <BtnIcon className="rounded-full" onClick={openProfileHandler}>
        {user?.avatar && <Avatar className="w-10 h-10" src={user.avatar} />}
      </BtnIcon>
      <div className="flex gap-2">
        <BtnIcon
          icon={isNewConversationOpen ? <MdArrowBack /> : <MdMessage />}
          iconClasses="text-2xl"
          onClick={openNewConversationHandler}
        />
        <DropdownBtn actions={actions} />
      </div>
    </div>
  );
};

export default Header;
