import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Sidenav from "../Sidenav";
import Card from "./../Card";
import "./style.css";

const DashboardWatchList = () => {
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
    getUserWatchList();
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

  const getUserWatchList = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/userWatchList/${state.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      const live = res.data.watchlist.filter((auction) => !auction.sold);
      const sold = res.data.watchlist.filter((auction) => auction.sold);
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
                      {showLive.map((auction) => (
                        <Card
                          preview={false}
                          data={auction}
                          watchlist={true}
                          key={auction._id}
                          render={getUserWatchList}
                        />
                      ))}
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
              {sold.length > 0 ? (
                showSold.length > 0 ? (
                  <>
                    <div className="cards">
                      {showSold.map((auction) => (
                        <Card
                          preview={false}
                          data={auction}
                          watchlist={true}
                          key={auction._id}
                          render={getUserWatchList}
                        />
                      ))}
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

export default DashboardWatchList;
