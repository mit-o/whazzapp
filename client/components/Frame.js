import { useState } from "react";
import { MdOutlineDoubleArrow } from "react-icons/md";
import BtnIcon from "./BtnIcon";
import useDetectScreen from "../hooks/useDetectScreen";

const Frame = ({ children }) => {
  const [isFrameOpen, setIsFrameOpen] = useState(false);
  const isSmallScreen = useDetectScreen(1024);

  const openFrameClasses = `fixed lg:relative h-full flex flex-col bg-lightplus w-5/6 lg:w-[500px] border-r border-stone-300/30 z-50 ${
    isSmallScreen ? (isFrameOpen ? "translate-x-0" : "-translate-x-full") : null
  } transition-transform duration-300`;

  const openFrameBtnClasses =
    "absolute top-2/4 right-[-30px] h-[30px] w-[30px] translate-y-1/2 rounded-full text-stone-400";

  const openFrameBtn = isSmallScreen && (
    <BtnIcon
      icon={
        <MdOutlineDoubleArrow
          className={`${isFrameOpen ? "rotate-180" : "rotate-0"} text-3xl`}
        />
      }
      btnClasses={openFrameBtnClasses}
      onClick={() => setIsFrameOpen((prev) => !prev)}
    />
  );

  return (
    <div className={openFrameClasses}>
      {children}
      {openFrameBtn}
    </div>
  );
};

export default Frame;
