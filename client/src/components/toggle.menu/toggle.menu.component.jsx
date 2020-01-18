import React from "react";
import "./toggle.menu.style.scss";

const ToggleMenu = ({ showMenu, onClick }) => {
  return (
    <div onClick={onClick} className={showMenu ? "menu-btn close" : "menu-btn"}>
      <div className="btn-line"></div>
      <div className="btn-line"></div>
      <div className="btn-line"></div>
    </div>
  );
};

export default ToggleMenu;
