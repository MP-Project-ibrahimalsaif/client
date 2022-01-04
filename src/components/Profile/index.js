import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSnackbar } from "notistack";
import Navbar from "./../Navbar";
import Card from "./../Card";
import Footer from "./../Footer";
import "./style.css";

const MySwal = withReactContent(Swal);

const Profile = () => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [profile, setProfile] = useState(null);
  const [cards, setCards] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [loadElements, setLoadElements] = useState(20);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
      user: state.Login.user,
    };
  });

  useEffect(() => {
    getUserAuction();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (profile) {
      setCards(profile.auctions.slice(0, loadElements));
      setLoadMore(false);
    }
    // eslint-disable-next-line
  }, [loadMore]);

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

  const loadMoreAuctions = () => {
    setLoadMore(true);
    setLoadElements(loadElements + 5);
  };

  const getUserAuction = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/${id}`
      );
      setProfile(res.data);
      setCards(res.data.auctions.slice(0, loadElements));
    } catch (error) {
      console.log(error);
    }
  };

  const createReport = async () => {
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
        try {
          await axios.post(
            `${process.env.REACT_APP_BASE_URL}/reports/${id}`,
            {
              reason,
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

  const endRender = async () => {
    setProfile(null);
    setCards([]);
    getUserAuction();
  };

  return (
    <>
      <Navbar show={true} />
      <div className="profile">
        {profile ? (
          <>
            <div className="profileInfo">
              <div className="AvatarName">
                <img src={profile.avatar} alt={`${profile.name} avatar`} />
                <h1>{profile.name}</h1>
              </div>
              <div>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  className="profileInfoReport"
                  aria-controls="long-menu"
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <BsThreeDotsVertical className="auctionCardReport" />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => createReport()}>Report</MenuItem>
                </Menu>
              </div>
            </div>
            <div className="profileTitle">
              <h1>{profile.name} Auctions</h1>
            </div>
            {cards.length > 0 ? (
              <div className="profileCards">
                {cards.map((auction) =>
                  state.user && state.user.watchlist ? (
                    state.user.watchlist.find(
                      (addedAuction) => addedAuction === auction._id
                    ) ? (
                      <Card
                        preview={false}
                        data={auction}
                        watchlist={true}
                        key={auction._id}
                        render={endRender}
                      />
                    ) : (
                      <Card
                        preview={false}
                        data={auction}
                        watchlist={false}
                        key={auction._id}
                        render={endRender}
                      />
                    )
                  ) : (
                    <Card
                      preview={false}
                      data={auction}
                      watchlist={false}
                      key={auction._id}
                      render={endRender}
                    />
                  )
                )}
              </div>
            ) : (
              <div className="centerHight">
                <h1>No Acutions yet!!</h1>
              </div>
            )}
            {loadElements <= cards.length ? (
              <button className="loadMorCardseBtn" onClick={loadMoreAuctions}>
                {loadMore ? "Loading..." : "Load More"}
              </button>
            ) : (
              ""
            )}
          </>
        ) : (
          <div className="center">
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Profile;
