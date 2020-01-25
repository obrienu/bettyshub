import React from "react";
import "./show.thumbnail.style.scss";

const ShowThumbnail = ({ background, onClick }) => {
  return (
    <div onClick={onClick} className="ShowThumbnail">
      <img className="ShowThumbnailImage" src={background} alt="" />
    </div>
  );
};

export default ShowThumbnail;
