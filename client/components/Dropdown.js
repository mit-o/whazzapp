const Dropdown = ({ actions, isOpen }) => {
  return (
    <ul
      className={`absolute top-10 right-0 p-2 z-50 bg-lightplus rounded-lg shadow-lg ${
        isOpen ? "flex flex-col" : "hidden"
      }`}
    >
      {actions?.map(({ action, func }) => (
        <li
          key={action}
          className="py-3 px-8 w-full whitespace-nowrap text-elipsis rounded-lg hover:bg-accent hover:text-light"
          onClick={func}
        >
          {action}
        </li>
      ))}
    </ul>
  );
};

export default Dropdown;
