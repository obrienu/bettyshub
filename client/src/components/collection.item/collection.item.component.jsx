import React from "react";
import "./collection.item.style.scss";
import { withRouter } from "react-router-dom";

const CollectionItem = ({ item, shop, history, getShowpage }) => {
  const { price, name, imageUrl, _id } = item;
  return (
    <div
      onClick={() => {
        history.push(`/show/${shop}/${_id}`);
      }}
      className="CollectionItem"
    >
      <span className="CollectionItemFooterSale">Sale</span>
      <div
        style={{ backgroundImage: `url(${imageUrl[0]})` }}
        className="CollectionItemImage"
      ></div>
      <div className="CollectionItemBody">
        <div className="CollectionItemName">{name}</div>
        <div className="CollectionItemFooter">
          <span className="CollectionItemFooterPrice"> # {price}</span>
          <span className="CollectionItemFooterFavourite">
            {" "}
            <i className="far fa-heart"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CollectionItem);
