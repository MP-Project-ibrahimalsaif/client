import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { BsThreeDots } from "react-icons/bs";
import { RiPlayListAddFill } from "react-icons/ri";
import "./style.css";

const Card = ({ preview, data }) => {
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const time = setInterval(timer, 1000);
    return () => clearInterval(time);
    // eslint-disable-next-line
  }, [data.endDateTime]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const timer = () => {
    const now = new Date();

    const distance = data.endDateTime - now;

    setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
  };

  return (
    <div className="auctionCard">
      <div className="auctionCardHeader">
        <img
          className="auctionCardAvatar"
          src={data.createdBy.avatar}
          alt="user avatar"
        />
        <span className="auctionCardCounter">
          {days}d{hours}h{minutes}m{seconds}s
        </span>
      </div>
      <img
        className="auctionCardImage"
        src={data.images.length > 0 ? data.images[0] : "https://www.urbansplash.co.uk/images/placeholder-16-9.jpg"}
        alt="auction img"
      />
      <div className="auctionCardInfo">
        <div className="auctionCardInfoHeader">
          <h1 className="auctionCardTitle">
            {data.title ? data.title : "title"}
          </h1>
          <div>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls="long-menu"
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <BsThreeDots className="auctionCardReport" />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Report</MenuItem>
            </Menu>
          </div>
        </div>
        <div className="auctionCardInfoPrice">
          <span>{data.initialPrice ? data.initialPrice : "0"} SAR</span>
          <span>0 Bids</span>
        </div>
      </div>
      <div className="auctionCardOptions">
        <span>Place a bid</span>
        <RiPlayListAddFill className="auctionCardOptionsAdd" />
      </div>
    </div>
  );
};

export default Card;
