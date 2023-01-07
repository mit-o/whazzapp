const BtnIcon = (props) => {
  return (
    <button
      type={props.type || "button"}
      className={props.btnClasses}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.icon && <span className={props.iconClasses}>{props.icon}</span>}
      {props.children}
    </button>
  );
};

export default BtnIcon;
