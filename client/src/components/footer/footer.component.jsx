import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo1.png";
import "./footer.style.scss";

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="FooterTop">
        <div className="FooterTopSection">
          <img src={Logo} alt="logo" />
        </div>
        <div className="FooterTopSection">
          <li className="FooterLinks">
            <Link className="FooterLink" to="/">
              Home
            </Link>
          </li>
          <li className="FooterLinks">
            <Link className="FooterLink" to="/Fabrics">
              Fabrics
            </Link>
          </li>
          <li className="FooterLinks">
            <Link className="FooterLink" to="/Accessories">
              Accessories
            </Link>
          </li>
          <li className="FooterLinks">
            <Link className="FooterLink" to="/Rich">
              Rich
            </Link>
          </li>
        </div>
        <div className="FooterTopSection">
          <li className="FooterLinks">
            <Link className="FooterLink" to="/About">
              About Us
            </Link>
          </li>
          <li className="FooterLinks">
            <Link className="FooterLink" to="/Contact">
              Contact Us
            </Link>
          </li>
          <li className="FooterLinks">
            <Link className="FooterLink" to="/Accessories">
              Blog
            </Link>
          </li>
          <li className="FooterLinks">
            <Link className="FooterLink" to="/Fabric">
              Shop
            </Link>
          </li>
        </div>
        <div className="FooterTopSection">
          <li className="FooterContactInfo">Contact Info</li>
          <li className="FooterAddresses">
            <span className="FooterIcon">
              <i className="fas fa-location-arrow"></i>
            </span>
            {"  "}
            <span className="FooterAddress">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </span>
          </li>
          <li className="FooterAddresses">
            <span className="FooterIcon">
              <i className="fas fa-mobile-alt"></i>
            </span>
            {"  "}
            <span className="FooterAddress">08065288667</span>
          </li>
          <li className="FooterAddresses">
            <span className="FooterIcon">
              {" "}
              <i className="fas fa-envelope"></i>
            </span>
            {"  "}
            <span className="FooterAddress">lorem@gmail.com</span>
          </li>
        </div>
      </div>
      <div className="FooterBottom">
        Copyright &copy; 2019, Designed by Pisces 360 Net
      </div>
    </footer>
  );
};

export default Footer;
