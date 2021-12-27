import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Carousel } from "@trendyol-js/react-carousel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import Navbar from "./../Navbar";
import Footer from "./../Footer";
import "./style.css";

const Auction = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [bid, setBid] = useState("");
  const [message, setMessage] = useState("");

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
    };
  });

  useEffect(() => {
    getAuction();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const time = setInterval(timer, 1000);
    return () => clearInterval(time);
    // eslint-disable-next-line
  }, [auction]);

  const getAuction = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/auctions/${id}`
      );
      setBids(res.data.bids);
      setAuction(res.data.auction);
    } catch (error) {
      console.log(error);
    }
  };

  const timer = () => {
    if (auction) {
      const distance = Date.parse(auction.endDateTime) - new Date();

      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHours(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
    }
  };

  const addBid = async () => {
    setMessage("");
    const bidNumber = Number(bid);
    if (auction) {
      if (Number.isInteger(bidNumber)) {
        if (bidNumber - auction.currentPrice < auction.minIncrement) {
          setMessage(
            `Your bid should be higher than the current price by ${auction.minIncrement}`
          );
        } else {
          try {
            await axios.post(
              `${process.env.REACT_APP_BASE_URL}/bids/${id}`,
              {
                bid: bidNumber,
              },
              {
                headers: {
                  Authorization: `Bearer ${state.token}`,
                },
              }
            );
            getAuction();
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        setMessage("It must be a number");
      }
    }
  };

  return (
    <>
      <Navbar show={false} />
      <div className="auctionLanding">
        <h1 className="auctionLandingTitle fade-in">
          {auction ? auction.title : ""}
        </h1>
      </div>
      <div className="auctionDisplay">
        {auction ? (
          <>
            <div className="auctionInfo">
              <div className="auctionInfoSlideShow">
                <Carousel
                  show={1}
                  swiping={true}
                  infinite={true}
                  className="imagesCarousel"
                  rightArrow={<AiOutlineArrowRight className="carouselArrow" />}
                  leftArrow={<AiOutlineArrowLeft className="carouselArrow" />}
                >
                  {auction.images.map((image) => {
                    return <img src={image} alt={`${auction.title} img`} />;
                  })}
                </Carousel>
              </div>
              <div className="auctionInfoDetails">
                <div className="auctionInfoDetailsTimer">
                  <p>
                    Auctions ends in{" "}
                    <span>
                      {days}d {hours}h {minutes}m {seconds}s
                    </span>
                  </p>
                </div>
                <div className="auctionInfoDetailsTitle">
                  <h1>{auction.title}</h1>
                </div>
                <div className="auctionInfoDetailsCat">
                  {auction.categories.map((category, index) => (
                    <span key={index}>{category}</span>
                  ))}
                </div>
                <div className="auctionInfoDetailsDesc">
                  <p>{auction.description}</p>
                </div>
                <div className="auctionInfoDetailsPrice">
                  <div className="auctionInfoDetailsPriceLabel">
                    <h2>Current Price</h2>
                  </div>
                  <div className="auctionInfoDetailsPriceDetails">
                    <p>{auction.currentPrice} SAR</p>
                  </div>
                </div>
                <div className="auctionInfoDetailsCreator">
                  <div className="auctionInfoDetailsCreatorLabel">
                    <h2>Posted by</h2>
                  </div>
                  <div className="auctionInfoDetailsCreatorDetails">
                    <img
                      src={auction.createdBy.avatar}
                      alt={`${auction.createdBy.name} avatar`}
                    />
                    <p>{auction.createdBy.name}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="auctionBid">
              <h1>Make a bid</h1>
              {state.token ? (
                <>
                  {message ? <div className="bidMessage">{message}</div> : ""}
                  <div>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      defaultValue={auction.currentPrice}
                      onChange={(e) => setBid(e.target.value)}
                      required
                      endAdornment={
                        <InputAdornment position="end">SAR</InputAdornment>
                      }
                    />
                    <button onClick={addBid} className="addBidBtn">
                      ADD
                    </button>
                  </div>
                </>
              ) : (
                <div className="bidMessage">
                  You have to login to start biding
                </div>
              )}
            </div>
            <div className="auctionBidsHistory">
              <h1>Bids history</h1>
              {bids.map((bid) => (
                <div className="auctionBidsHistoryItem">
                  <img src={bid.createdBy.avatar} alt={`${bid.createdBy.name}`} />
                  <span className="auctionBidsHistoryItemName">{bid.createdBy.name}</span>
                  <p>&nbsp;Made a&nbsp;</p>
                  <span className="auctionBidsHistoryItemBid">{bid.bid}</span>
                  <p>&nbsp;bid at&nbsp;</p>
                  <span className="auctionBidsHistoryItemDate">{bid.timestamp.substring(0, 10)}</span>
                </div>
              ))}
            </div>
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

export default Auction;
