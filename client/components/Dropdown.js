const Dropdown = ({ actions, isOpen }) => {
  return (
    <ul
      className={`absolute top-10 right-0 p-2 bg-dropdown shadow-lg ${
        isOpen ? "flex flex-col" : "hidden"
      }`}
    >
      {actions?.map(({ action, func }) => (
        <li
          key={action}
          className="py-3 px-8 w-full whitespace-nowrap text-elipsis hover:bg-primary"
          onClick={func}
        >
          {action}
        </li>
      ))}
    </ul>
  );
};

export default Dropdown;
