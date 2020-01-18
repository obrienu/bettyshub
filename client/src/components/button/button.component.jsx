import React from "react";
import "./button.style.scss";

const Button = props => {
  return (
    <div
      onClick={props.onClick}
      style={{ width: props.width }}
      className="Button"
    >
      {props.children}
    </div>
  );
};

export default Button;
