import React from "react";
import "./rich.product,.preview.style.scss";
import Rich_Data from "../../assets/rich.product.data";
import RichProductItem from "../rich.product.item/rich.product.item.component";

const RichProductPreview = () => {
  return (
    <section className="RichProductPreview">
      <h1 className="RichProductPreviewHeader">Bettys Rich</h1>
      <div className="ProductPreview">
        {Rich_Data.filter((rich, index) => index < 3).map((rich, index) => (
          <RichProductItem
            key={index}
            {...rich}
            isReversed={(index + 1) % 2 === 0}
          />
        ))}
      </div>
    </section>
  );
};

export default RichProductPreview;
