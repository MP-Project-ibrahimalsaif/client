import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Sidenav from "../Sidenav";
import Card from "./../Card";
import "./style.css";

const DashboardBids = () => {
  const [live, setLive] = useState([]);
  const [showLive, setShowLive] = useState([]);
  const [sold, setSold] = useState([]);
  const [showSold, setShowSold] = useState([]);
  const [loadMoreLive, setLoadMoreLive] = useState(false);
  const [loadElementsLive, setLoadElementsLive] = useState(4);
  const [loadMoreSold, setLoadMoreSold] = useState(false);
  const [loadElementsSold, setLoadElementsSold] = useState(4);

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
      user: state.Login.user,
    };
  });

  useEffect(() => {
    getUserBids();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setShowLive(live.slice(0, loadElementsLive));
    setLoadMoreLive(false);
    // eslint-disable-next-line
  }, [loadMoreLive]);

  useEffect(() => {
    setShowSold(sold.slice(0, loadElementsSold));
    setLoadMoreSold(false);
    // eslint-disable-next-line
  }, [loadMoreSold]);

  const loadMoreAuctionLive = () => {
    setLoadMoreLive(true);
    setLoadElementsLive(loadElementsLive + 4);
  };

  const loadMoreAuctionSold = () => {
    setLoadMoreSold(true);
    setLoadElementsSold(loadElementsSold + 4);
  };

  const getUserBids = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/userBids/${state.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      const liveData = res.data
        .filter((auction) => !auction.auction.sold)
        .map((auction) => auction.auction);
      const live = [];
      liveData.map((auction) =>
        live.filter((auctionUnique) => auctionUnique._id === auction._id)
          .length > 0
          ? null
          : live.push(auction)
      );

      const soldData = res.data
        .filter((auction) => auction.auction.sold)
        .map((auction) => auction.auction);
      const sold = [];
      soldData.map((auction) =>
        sold.filter((auctionUnique) => auctionUnique._id === auction._id)
          .length > 0
          ? null
          : sold.push(auction)
      );

      setLive(live);
      setShowLive(live.slice(0, loadElementsLive));
      setSold(sold);
      setShowSold(sold.slice(0, loadElementsSold));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {state.token ? (
        <>
          <Sidenav />
          <div className="dashboardLayout">
            <div className="dashboardSection">
              <h1 className="dashboardSectionTitle">Live Now</h1>
              {live ? (
                showLive.length > 0 ? (
                  <>
                    <div className="cards">
                      {showLive.map((auction) =>
                        state.user.watchlist ? (
                          state.user.watchlist.find(
                            (addedAuction) => addedAuction === auction._id
                          ) ? (
                            <Card
                              preview={false}
                              data={auction}
                              watchlist={true}
                              key={auction._id}
                            />
                          ) : (
                            <Card
                              preview={false}
                              data={auction}
                              watchlist={false}
                              key={auction._id}
                            />
                          )
                        ) : (
                          <Card
                            preview={false}
                            data={auction}
                            watchlist={false}
                            key={auction._id}
                          />
                        )
                      )}
                    </div>
                    <div className="center">
                      {loadElementsLive < live.length ? (
                        <button
                          className="loadMordWatchlisteBtn"
                          onClick={loadMoreAuctionLive}
                        >
                          {loadMoreLive ? "Loading..." : "Load More"}
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                ) : (
                  <div className="center">
                    <h2>No live auctions</h2>
                  </div>
                )
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
            <div className="dashboardSection">
              <h1 className="dashboardSectionTitle">Sold</h1>
              {sold? (
                showSold.length > 0 ? (
                  <>
                    <div className="cards">
                      {showSold.map((auction) =>
                        state.user.watchlist ? (
                          state.user.watchlist.find(
                            (addedAuction) => addedAuction === auction._id
                          ) ? (
                            <Card
                              preview={false}
                              data={auction}
                              watchlist={true}
                              key={auction._id}
                            />
                          ) : (
                            <Card
                              preview={false}
                              data={auction}
                              watchlist={false}
                              key={auction._id}
                            />
                          )
                        ) : (
                          <Card
                            preview={false}
                            data={auction}
                            watchlist={false}
                            key={auction._id}
                          />
                        )
                      )}
                    </div>
                    <div className="center">
                      {loadElementsSold < sold.length ? (
                        <button
                          className="loadMordWatchlisteBtn"
                          onClick={loadMoreAuctionSold}
                        >
                          {loadMoreSold ? "Loading..." : "Load More"}
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                ) : (
                  <div className="center">
                    <h2>No sold auctions</h2>
                  </div>
                )
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
          </div>
        </>
      ) : (
        <div className="centerDashboard">
          <div className="error">
            <img src="/img/stop.svg" className="errorImg" alt="error" />
            <h1 className="errorText">You are not logged in yet</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardBids;
