import React from "react";
import { Fragment } from "react";
import "./rich.product.item.style.scss";
import { withRouter } from "react-router-dom";
import Button from "../button/button.component";

const RichProductItem = ({ name, text, img, isReversed }) => {
  const normal = (
    <div className="RichProductItem">
      <div className="RichProductText">
        <h1 className="RichProductHeader">{name}</h1>
        <p>{text}</p>
        <Button onClick={() => {}} width={"6rem"} className="">
          Read More
        </Button>
      </div>

      <div className="RichProductImage">
        <img src={img} alt={text} />
      </div>
    </div>
  );

  const reversed = (
    <div className="RichProductItem">
      <div className="RichProductImage">
        <img src={img} alt={text} />
      </div>
      <div className="RichProductText">
        <h1 className="RichProductHeaderRevered">{name}</h1>
        <p>{text}</p>
        <Button onClick={() => {}} width={"6rem"} className="">
          Read More
        </Button>
      </div>
    </div>
  );

  return <Fragment>{isReversed ? reversed : normal}</Fragment>;
};

export default withRouter(RichProductItem);
