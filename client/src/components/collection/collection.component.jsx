import React, { Component } from "react";
import ShopSideMenu from "../shop.side.menu/shop.side.menu.component";
import "./collection.style.scss";
import {
  selectCategory,
  selectByCategory
} from "../../redux/shop/shop.selection";
import { getItems } from "../../redux/shop/shop.actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Loader from "../loader/loader.component";
import CollectionOverview from "../collection.overview/collection.overview.component";

export class Collection extends Component {
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
  items: selectByCategory(ownProps.shop, ownProps.match.params.category)(state),
  categories: selectCategory(ownProps.shop)(state)
});

const mapDispatchToProps = dispatch => ({
  getItems: shop => dispatch(getItems(shop))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Collection)
);
