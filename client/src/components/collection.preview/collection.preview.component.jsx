import React from "react";
import "./collection.preview.style.scss";

const CollectionPreview = WrappedComponent => ({ data, name }) => {
  return (
    <section className="CollectionPreview">
      <div className="CollectionPreviewCategory">
        <span className="Category">{name}</span>
        <span className="Arrival">NEW ARRIVAL</span>
      </div>
      <div className="CollectionPreviewItems">
        {data
          .filter((items, index) => index < 4)
          .map(item => (
            <WrappedComponent key={item.id} {...item} />
          ))}
      </div>
    </section>
  );
};

export default CollectionPreview;
