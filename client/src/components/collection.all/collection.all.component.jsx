import React, { Component } from "react";
import ShopSideMenu from "../shop.side.menu/shop.side.menu.component";
import "./collection.all.style.scss";
import { selectCategory, selectAll } from "../../redux/shop/shop.selection";
import { getItems } from "../../redux/shop/shop.actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Loader from "../loader/loader.component";
import CollectionOverview from "../collection.overview/collection.overview.component";

export class AllCollection extends Component {
  componentDidMount() {
    const { items, shop, getItems } = this.props;
    if (!items) {
      getItems(shop);
    }
  }

  render() {
    const { categories, shop, items } = this.props;
    return items && categories ? (
      <div className="ShopPage">
        <div className="ShopPageMenu">
          <ShopSideMenu shop={shop} category={categories} />
        </div>
        <div className="ShopPageOverview">
          <CollectionOverview items={items} shop={shop} />
        </div>
      </div>
    ) : (
      <Loader />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  categories: selectCategory(ownProps.shop)(state),
  items: selectAll(ownProps.shop)(state)
});

const mapDispatchToProps = dispatch => ({
  getItems: shop => dispatch(getItems(shop))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllCollection)
);
