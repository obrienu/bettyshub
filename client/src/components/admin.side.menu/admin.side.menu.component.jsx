import React from "react";
import "./admin.side.menu.style.scss";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="AdminMenu">
      <li className="AdminMenuLinks">
        <NavLink
          activeClassName="AdminMenuLinkActive"
          className="AdminMenuLink"
          to="/bettyhubs/admin"
        >
          Add Commodity
        </NavLink>
      </li>
      <li className="AdminMenuLinks">
        <NavLink
          activeClassName="AdminMenuLinkActive"
          className="AdminMenuLink"
          to="/bettyhubs/admin/update"
        >
          Update Commodity
        </NavLink>
      </li>
      <li className="AdminMenuLinks">
        <NavLink
          activeClassName="AdminMenuLinkActive"
          className="AdminMenuLink"
          to="/bettyhubs/admin/addrich"
        >
          Add Longrich Product
        </NavLink>
      </li>
      <li className="AdminMenuLinks">
        <NavLink
          activeClassName="AdminMenuLinkActive"
          className="AdminMenuLink"
          to="/bettyhubs/admin/updaterich"
        >
          Update Longrich Product
        </NavLink>
      </li>
    </div>
  );
};

export default AdminMenu;
