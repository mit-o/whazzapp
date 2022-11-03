import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
const listItems = ["New group", "Settings", "Logout"];

const Dropdown = ({ isOpen }) => {
  const dispatch = useDispatch();
  return (
    <ul
      className={`absolute top-10 right-0 p-2 bg-dropdown shadow-lg ${
        isOpen ? "flex flex-col" : "hidden"
      }`}
    >
      {listItems.map((el, idx) => (
        <li
          key={idx}
          className="py-3 px-8 w-full whitespace-nowrap text-elipsis hover:bg-primary"
          onClick={el === "Logout" ? () => dispatch(logout()) : null}
        >
          {el}
        </li>
      ))}
    </ul>
  );
};

export default Dropdown;
