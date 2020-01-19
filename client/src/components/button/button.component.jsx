import React from "react";
import "./button.style.scss";

const Button = props => {
  const style = props.style;
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      style={style}
      className="Button"
    >
      {props.children}
    </button>
  );
};

export default Button;
