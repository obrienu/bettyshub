import React from "react";
import "./collection.item.style.scss";

const CollectionItem = ({ price, name, img }) => {
  return (
    <div className="CollectionItem">
      <span className="CollectionItemFooterSale">Sale</span>
      <div
        style={{ backgroundImage: `url(${img})` }}
        className="CollectionItemImage"
      ></div>
      <div className="CollectionItemBody">
        <div className="CollectionItemName">{name}</div>
        <div className="CollectionItemFooter">
          <span className="CollectionItemFooterPrice"> # {price}</span>
          <span className="CollectionItemFooterFavourite">
            {" "}
            <i class="far fa-heart"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CollectionItem;
