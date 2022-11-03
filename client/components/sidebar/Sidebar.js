import { useState, useEffect, useCallback } from "react";
import { MdOutlineDoubleArrow, MdMessage } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";
import Dropdown from "../Dropdown";
import Searchbar from "./Searchbar";
import ContactList from "./Conversations";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const detectMobileScreen = useCallback(() => {
    const isActive = window.innerWidth < 1024;
    setIsMobile(isActive);
  }, [setIsMobile]);

  useEffect(() => {
    detectMobileScreen();
    window.addEventListener("resize", detectMobileScreen);
    return () => window.removeEventListener("resize", detectMobileScreen);
  }, [detectMobileScreen]);

  const openSidebarHandler = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const openDropdownHandler = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div
      className={`fixed lg:relative h-full flex flex-col bg-primary w-5/6 lg:w-[400px] border-r border-stone-100/20 z-50 ${
        isMobile
          ? isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
          : null
      } transition-transform duration-300`}
    >
      <div className="flex p-5 justify-between bg-secondary text-stone-100">
        <div className="w-10 h-10 rounded-full cursor-pointer">
          <Image
            layout="responsive"
            width="100%"
            height="100%"
            className="rounded-full object-cover"
            src="/avatar.jpeg"
          />
        </div>
        <div className="flex space-x-2.5">
          <div className="p-2 rounded-full cursor-pointer">
            <span className="text-2xl">
              <MdMessage />
            </span>
          </div>
          <div
            className={`relative p-2 rounded-full cursor-pointer ${
              isDropdownOpen ? "bg-primary" : null
            }`}
            onClick={openDropdownHandler}
          >
            <span className="text-2xl">
              <BsThreeDotsVertical />
            </span>
            <Dropdown isOpen={isDropdownOpen} />
          </div>
        </div>
      </div>

      {/* <Searchbar /> */}
      <ContactList />

      {isMobile && (
        <span
          className="absolute top-2/4 right-[-30px] h-[30px] w-[30px] translate-y-1/2 rounded-full cursor-pointer text-stone-400"
          onClick={openSidebarHandler}
        >
          <MdOutlineDoubleArrow
            className={`${isSidebarOpen ? "rotate-180" : "rotate-0"} text-3xl`}
          />
        </span>
      )}
    </div>
  );
};

export default Sidebar;
