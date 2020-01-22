import React, { Component } from "react";
import "./collection.overview.style.scss";
import CollectionItem from "../collection.item/collection.item.component";
import { withRouter } from "react-router-dom";
import {} from "../../redux/shop/shop.actions";
import Loader from "../loader/loader.component";

class CollectionOverview extends Component {
  render() {
    const { items, shop } = this.props;
    const header = shop.substring(0, 1).toUpperCase() + shop.substring(1);
    return items ? (
      <section className="CollectionOverview">
        <h1 className="CollectionOverviewHeader">{header}</h1>
        <div className="CollectionOverviewTop">
          {items.data.map(item => (
            <CollectionItem key={item._id} {...item} />
          ))}
        </div>
        <div className="CollectionOverviewBottom">{items.totalItems}</div>
      </section>
    ) : (
      <Loader />
    );
  }
}

export default withRouter(CollectionOverview);
