import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { BsThreeDots } from "react-icons/bs";
import { RiPlayListAddFill } from "react-icons/ri";
import "./style.css";

const Card = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="auctionCard">
      <div className="auctionCardHeader">
        <img
          className="auctionCardAvatar"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwVLdSDmgrZN7TkzbHJb8dD0_7ASUQuERL2A&usqp=CAU"
          alt="user avatar"
        />
        <span className="auctionCardCounter">10d 5h 4m 2s</span>
      </div>
      <img
        className="auctionCardImage"
        src="https://cdn.vox-cdn.com/thumbor/2xj1ySLIz1EZ49NvSsPzq8Itjyg=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23084330/bored_ape_nft_accidental_.jpg"
        alt="auction title"
      />
      <div className="auctionCardInfo">
        <div className="auctionCardInfoHeader">
          <h1 className="auctionCardTitle">Bored Ape</h1>
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
          <span>50 SR</span>
          <span>35 Bids</span>
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
