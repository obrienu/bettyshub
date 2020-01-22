import React, { Component } from "react";
import "./shop.side.menu.style.scss";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { getFilteredItems } from "../../redux/shop/shop.actions";

class ShopSideMenu extends Component {
  render() {
    const { category, shop, getFilteredItems } = this.props;
    return (
      <div className="ShopSideMenu">
        <li className="ShopMenuCategory">
          <NavLink
            activeClassName="ActiveShopMenuCategoryLink"
            className="ShopMenuCategoryLink"
            to={`/${shop}`}
          >
            {" "}
            ALL
          </NavLink>
        </li>
        {category.map((category, index) => (
          <li key={index} className="ShopMenuCategory">
            <NavLink
              activeClassName="ActiveShopMenuCategoryLink"
              className="ShopMenuCategoryLink"
              to={`/${shop}/${category}`}
            >
              {" "}
              {category.toUpperCase()}{" "}
            </NavLink>
          </li>
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getFilteredItems: (shop, category) =>
    dispatch(getFilteredItems(shop, category))
});

export default connect(null, mapDispatchToProps)(ShopSideMenu);
