import React from "react";
import "./homepage.style.scss";
import Carousel from "../../components/carousel/carousel.component";
import CollectionPreview from "../../components/collection.preview/collection.preview.component";
import CollectionItem from "../../components/collection.item/collection.item.component";
import COLLECTION_DATA from "../../assets/prieview.data";
import RichProductPreview from "../../components/rich.product.preview/rich.product,.preview.component";

const PreviewWrapper = CollectionPreview(CollectionItem);
const HomePage = () => {
  return (
    <main className="Homepage">
      <Carousel />
      <PreviewWrapper name="Fabrics" data={COLLECTION_DATA} />
      <PreviewWrapper name="Accessories" data={COLLECTION_DATA} />
      <RichProductPreview />
    </main>
  );
};

export default HomePage;
