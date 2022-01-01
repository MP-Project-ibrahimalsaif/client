import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { BsThreeDots } from "react-icons/bs";
import { CgPlayListAdd, CgPlayListRemove } from "react-icons/cg";
import { useSnackbar } from "notistack";
import { addAuctionToWatchList } from "./../../reducers/Login";
import { deleteAuctionFromWatchList } from "./../../reducers/Login";
import "./style.css";

const MySwal = withReactContent(Swal);

const Card = ({ preview, data, watchlist, render }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [watchList, setWatchList] = useState(watchlist);
  const open = Boolean(anchorEl);

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
      user: state.Login.user,
    };
  });

  useEffect(() => {
    if (data.endDateTime) {
      const time = setInterval(timer, 1000);
      return () => clearInterval(time);
    }
    // eslint-disable-next-line
  }, [data.endDateTime]);

  const handleSnackbar = (message, type) => {
    enqueueSnackbar(message, {
      variant: type,
    });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const timer = () => {
    const distance = Date.parse(data.endDateTime) - new Date();

    setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
  };

  const createReport = async (id, auction_id) => {
    if (state.token) {
      const { value: reason } = await MySwal.fire({
        title: "Report an auction",
        input: "textarea",
        inputPlaceholder: "Type the reason for this report",
        inputAttributes: {
          "aria-label": "Type the reason for this report",
        },
        showCancelButton: true,
        confirmButtonColor: "#2f2057",
        confirmButtonText: "Report",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      });

      if (reason) {
        const reportReason = `${reason}, report about the auction ${auction_id}`;

        try {
          await axios.post(
            `${process.env.REACT_APP_BASE_URL}/reports/${id}`,
            {
              reason: reportReason,
            },
            {
              headers: {
                Authorization: `Bearer ${state.token}`,
              },
            }
          );
          handleSnackbar(
            "a report for this auction has been issued",
            "success"
          );
        } catch (error) {
          console.log(error);
          handleSnackbar("oops something went wrong", "error");
        }
      }
    } else {
      handleSnackbar("you have to log-in to report an auction", "error");
    }
  };

  const addToWatchList = async (id) => {
    if (state.token) {
      try {
        await axios.post(
          `${process.env.REACT_APP_BASE_URL}/addAuctionToWatchlist/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );

        const user = state.user;
        user.watchlist.push(id);

        dispatch(addAuctionToWatchList(user));

        setWatchList(true);

        handleSnackbar(
          "the auction has been added to your watchlist",
          "success"
        );
      } catch (error) {
        console.log(error);
        handleSnackbar("oops something went wrong", "error");
      }
    } else {
      handleSnackbar(
        "you have to log-in to add an auction to watchlist",
        "error"
      );
    }
  };

  const deleteFromWatchList = async (id) => {
    if (state.token) {
      try {
        await axios.put(
          `${process.env.REACT_APP_BASE_URL}/deleteAuctionFromWatchlist/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );
        const user = state.user;
        user.watchlist = user.watchlist.filter((auction) => auction !== id);

        dispatch(deleteAuctionFromWatchList(user));

        setWatchList(false);

        handleSnackbar(
          "the auction has been removed from your watchlist",
          "success"
        );

        if (render) render();
        
      } catch (error) {
        console.log(error);
        handleSnackbar("oops something went wrong", "error");
      }
    } else {
      handleSnackbar(
        "you have to log-in to delete an auction to watchlist",
        "error"
      );
    }
  };

  return (
    <div className="auctionCard">
      <div className="auctionCardHeader">
        <img
          className="auctionCardAvatar"
          src={data.createdBy.avatar}
          onClick={() => !preview && navigate(`/users/${data.createdBy._id}`)}
          alt="user avatar"
        />
        {!data.sold && (
          <span className="auctionCardCounter">
            {days}d {hours}h {minutes}m {seconds}s
          </span>
        )}
      </div>
      <img
        className="auctionCardImage"
        src={
          data.images.length > 0
            ? data.images[0]
            : "https://www.urbansplash.co.uk/images/placeholder-16-9.jpg"
        }
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
              <MenuItem
                onClick={() => createReport(data.createdBy._id, data._id)}
              >
                Report
              </MenuItem>
            </Menu>
          </div>
        </div>
        <div className="auctionCardInfoPrice">
          <span>{data.initialPrice ? data.initialPrice : "0"} SAR</span>
          <span>{data.bids ? data.bids : "0"} Bids</span>
        </div>
      </div>
      <div className="auctionCardOptions">
        <span onClick={() => !preview && navigate(`/explore/${data._id}`)}>
          {data.sold ? "Visit auction" : "Place a bid"}
        </span>
        {watchList ? (
          <CgPlayListRemove
            className="auctionCardOptionsdelete"
            onClick={() => !preview && deleteFromWatchList(data._id)}
          />
        ) : (
          <CgPlayListAdd
            className="auctionCardOptionsAdd"
            onClick={() => !preview && addToWatchList(data._id)}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
