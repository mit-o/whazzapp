import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import BtnIcon from "./BtnIcon";
import Dropdown from "./Dropdown";

const DropdownBtn = ({ actions }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openDropdownHandler = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <BtnIcon
      btnClasses={`relative p-2 rounded-full ${
        isDropdownOpen ? "bg-accent" : null
      }`}
      iconClasses={`text-2xl ${isDropdownOpen ? "text-light" : ""}`}
      icon={<BsThreeDotsVertical />}
      onClick={openDropdownHandler}
    >
      <Dropdown actions={actions} isOpen={isDropdownOpen} />
    </BtnIcon>
  );
};

export default DropdownBtn;
