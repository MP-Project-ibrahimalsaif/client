import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import axios from "axios";
import schedule from "node-schedule";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Navbar from "./../Navbar";
import Footer from "./../Footer";
import "./style.css";

let socket;

const Auction = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [bidsShow, setBidsShow] = useState([]);
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [bid, setBid] = useState("");
  const [message, setMessage] = useState("");
  const [bidPrice, setBidPrice] = useState("");
  const [loadMore, setLoadMore] = useState(false);
  const [loadElements, setLoadElements] = useState(5);

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
    };
  });

  useEffect(() => {
    socket = io(process.env.REACT_APP_BASE_URL);
    socket.emit("auction_room", { room: id });
    // eslint-disable-next-line
  }, [process.env.REACT_APP_BASE_URL]);

  useEffect(() => {
    getAuction();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (auction) {
      schedule.scheduleJob(auction.endDateTime, () => {
        getAuction();
      });
    }
    // eslint-disable-next-line
  }, [auction]);

  useEffect(() => {
    socket.on("recieve_bid", (data) => {
      setBidPrice(data.bid);
      setBid(data.bid);
      document.getElementById("outlined-adornment-amount").value = data.bid;
      getAuction();
    });
    // eslint-disable-next-line
  }, [bid]);

  useEffect(() => {
    const time = setInterval(timer, 1000);
    return () => clearInterval(time);
    // eslint-disable-next-line
  }, [auction]);

  useEffect(() => {
    setBidsShow(bids.slice(0, loadElements));
    setLoadMore(false);
    // eslint-disable-next-line
  }, [loadMore]);

  const loadMoreBids = () => {
    setLoadMore(true);
    setLoadElements(loadElements + 5);
  };

  const getAuction = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/auctions/${id}`
      );
      setBids(res.data.bids.reverse());
      setBidsShow(res.data.bids.slice(0, loadElements));
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
            socket.emit("make_bid", { bid: bidNumber, room: id });
            setBidPrice(bidNumber);
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
                <Splide
                  options={{
                    rewind: true,
                  }}
                >
                  {auction.images.map((image, index) => {
                    return (
                      <SplideSlide key={index}>
                        <img src={image} alt={`${auction.title} img`} />
                      </SplideSlide>
                    );
                  })}
                </Splide>
              </div>
              <div className="auctionInfoDetails">
                <div className="auctionInfoDetailsTimer">
                  {auction.sold ? (
                    <p>Auction ended</p>
                  ) : (
                    <p>
                      Auction ends in{" "}
                      <span>
                        {days}d {hours}h {minutes}m {seconds}s
                      </span>
                    </p>
                  )}
                </div>
                <div className="auctionInfoDetailsTitle">
                  <h1>{auction.title}</h1>
                </div>
                <div className="auctionInfoDetailsCat">
                  {auction.categories.map((category, index) => (
                    <span className="auctionCat" key={index}>
                      {category}
                    </span>
                  ))}
                </div>
                <div className="auctionInfoDetailsDesc">
                  <p>{auction.description}</p>
                </div>
                {!auction.sold ? (
                  <div className="auctionInfoDetailsPrice">
                    <div className="auctionInfoDetailsPriceLabel">
                      <h2>Current Price</h2>
                    </div>
                    <div className="auctionInfoDetailsPriceDetails">
                      <p>{bidPrice ? bidPrice : auction.currentPrice} SAR</p>
                    </div>
                  </div>
                ) : auction.buyer ? (
                  <div className="auctionPriceAndWinner">
                    <div className="auctionInfoDetailsPrice">
                      <div className="auctionInfoDetailsPriceLabel">
                        <h2>Sold for</h2>
                      </div>
                      <div className="auctionInfoDetailsPriceDetails">
                        <p>{bidPrice ? bidPrice : auction.currentPrice} SAR</p>
                      </div>
                    </div>
                    <div className="auctionInfoDetailsCreator">
                      <div className="auctionInfoDetailsCreatorLabel">
                        <h2>Winner</h2>
                      </div>
                      <div className="auctionInfoDetailsCreatorDetails">
                        <img
                          src={auction.buyer.avatar}
                          alt={`${auction.buyer.name} avatar`}
                        />
                        <p>{auction.buyer.name}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="auctionNoBids">
                    <div className="auctionInfoDetailsPriceLabel">
                      <h2>Sold for</h2>
                    </div>
                    <p>Auction ended with no bids</p>
                  </div>
                )}
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
            {state.token && !auction.sold ? (
              <div className="auctionBid">
                <h1>Make a bid</h1>
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
              </div>
            ) : (
              ""
            )}
            <div className="auctionBidsHistory">
              <h1>Bids history</h1>
              {bids.length > 0 ? (
                bidsShow.map((bid) => (
                  <div className="auctionBidsHistoryItem" key={bid._id}>
                    <img
                      src={bid.createdBy.avatar}
                      alt={`${bid.createdBy.name}`}
                    />
                    <span className="auctionBidsHistoryItemName">
                      {bid.createdBy.name}
                    </span>
                    <p>&nbsp;Made a&nbsp;</p>
                    <span className="auctionBidsHistoryItemBid">{bid.bid}</span>
                    <p>&nbsp;SAR bid at&nbsp;</p>
                    <span className="auctionBidsHistoryItemDate">
                      {bid.timestamp.substring(0, 10)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="auctionNoBidsHistory">
                  <p>no bids yet!!</p>
                </div>
              )}
              {loadElements <= bids.length ? (
                <button className="loadMoreBtn" onClick={loadMoreBids}>
                  {loadMore ? "Loading..." : "Load More"}
                </button>
              ) : (
                ""
              )}
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
