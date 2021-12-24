import React from "react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import "./style.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="row">
          <a href="/#">
            <BsFacebook className="footerIcon" />
          </a>
          <a href="/#">
            <BsInstagram className="footerIcon" />
          </a>
          <a href="/#">
            <BsTwitter className="footerIcon" />
          </a>
        </div>
        <div className="row">
          MAZAD Copyright © {new Date().getFullYear()} All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
