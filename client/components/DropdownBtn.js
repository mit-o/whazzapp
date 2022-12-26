import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Dropdown from "./Dropdown";

const DropdownBtn = ({ actions }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openDropdownHandler = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div
      className={`relative p-2 rounded-full cursor-pointer ${
        isDropdownOpen ? "bg-accent" : null
      }`}
      onClick={openDropdownHandler}
    >
      <span className={`text-2xl ${isDropdownOpen ? "text-light" : null}`}>
        <BsThreeDotsVertical />
      </span>
      <Dropdown actions={actions} isOpen={isDropdownOpen} />
    </div>
  );
};

export default DropdownBtn;
