import React, { Component } from "react";
import "./collection.overview.all.style.scss";
import CollectionItem from "../collection.item/collection.item.component";
import { withRouter } from "react-router-dom";
import Loader from "../loader/loader.component";

class CollectionOverview extends Component {
  render() {
    const { items } = this.props;
    return items ? (
      <section className="CollectionOverview">
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
