import React from "react";
import "./carousel.style.scss";
import MenuThumbnail from "../homepage.menu.thumbnail/homepage.menu.thumbnail.component";
import DATA from "../../assets/menu.thumbnail.data";

const Carousel = () => {
  return (
    <div className="homePageCarousel">
      <div className="CarouselTop">
        <div className="CarouselTopText">
          <h1 className="CarouselHeaderText">Bettys Hub</h1>
          <h6 className="CarouselBodyText">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae
            quas consequatur similique exercitationem et reprehenderit impedit
            magni, quidem eius illo commodi illum sint fuga error odit debitis
            vero dolore nobis.
          </h6>
        </div>
      </div>
      <div className="HomePageCarouselThumbnails">
        {DATA.map(data => (
          <MenuThumbnail key={data.text} {...data} />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
