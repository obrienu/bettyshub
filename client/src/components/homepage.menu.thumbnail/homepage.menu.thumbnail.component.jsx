import React from "react";
import { Link } from "react-router-dom";
import "./homepage.menu.thumbnail.style.scss";

const MenuThumbnail = ({ link, bg, text, color }) => {
  const style = {
    backgroundImage: `url(${bg})`
  };

  return (
    <div>
      <Link to={`/${link}`}>
        <div className="MenuThumbnail">
          <div style={{ background: color }} className="ThumbnailText">
            {text}
          </div>
          <div style={style} className="ThumbnailImage"></div>
        </div>
      </Link>
    </div>
  );
};

export default MenuThumbnail;
