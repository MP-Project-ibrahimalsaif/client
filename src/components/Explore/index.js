import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Navbar from "./../Navbar";
import Card from "./../Card";
import Footer from "./../Footer";
import "./style.css";

const category = [
  "Art",
  "Entertainment",
  "Services",
  "Collectibles",
  "Electronics",
  "Jewelry",
];

const Explore = () => {
  const [auctionsShow, setAuctionsShow] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [condition, setCondition] = useState("all");
  const [filter, setFilter] = useState("all");
  const [loadMore, setLoadMore] = useState(false);
  const [loadElements, setLoadElements] = useState(20);

  const state = useSelector((state) => {
    return {
      user: state.Login.user,
    };
  });

  useEffect(() => {
    getAuctions();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setAuctionsShow(auctions.slice(0, loadElements));
    setLoadMore(false);
    // eslint-disable-next-line
  }, [loadMore]);

  useEffect(() => {
    filterSearch();
    // eslint-disable-next-line
  }, [search]);

  useEffect(() => {
    filterType();
    // eslint-disable-next-line
  }, [filter]);

  useEffect(() => {
    filterCondition();
    // eslint-disable-next-line
  }, [condition]);

  useEffect(() => {
    filterCat();
    // eslint-disable-next-line
  }, [categories]);

  const filterSearch = () => {
    if (search.trim()) {
      const searchedArray = auctionsShow.filter((auction) =>
        auction.title.includes(search)
      );
      setAuctionsShow(searchedArray);
    } else {
      setAuctionsShow(auctions);
    }
  };

  const filterType = () => {
    if (filter) {
      switch (filter) {
        case "all":
          setAuctionsShow(auctions);
          break;
        case "live":
          const liveAuctions = [...auctionsShow].filter((auction) => !auction.sold);
          setAuctionsShow(liveAuctions);
          break;
        case "ended":
          const endedAuctions = [...auctionsShow].filter((auction) => auction.sold);
          setAuctionsShow(endedAuctions);
          break;
        case "popular":
          const popularAuctions = [...auctionsShow]
            .filter((auction) => !auction.sold)
            .sort((a, b) => {
              return b.bids - a.bids;
            });
          setAuctionsShow(popularAuctions);
          break;
        case "last_minute":
          const lastMinuteAuctions = [...auctionsShow]
            .filter((auction) => !auction.sold)
            .sort((a, b) => {
              return (
                Math.abs(Date.now() - Date.parse(a.endDateTime)) -
                Math.abs(Date.now() - Date.parse(b.endDateTime))
              );
            });
          setAuctionsShow(lastMinuteAuctions);
          break;
        case "new":
          const newAuctions = [...auctionsShow]
            .filter((auction) => !auction.sold)
            .sort((a, b) => {
              return (
                Math.abs(Date.now() - Date.parse(a.timestamp)) -
                Math.abs(Date.now() - Date.parse(b.timestamp))
              );
            });
          setAuctionsShow(newAuctions);
          break;
        default:
          setAuctionsShow(auctions);
      }
    } else {
      setAuctionsShow(auctions);
    }
  };

  const filterCondition = () => {
    if (condition) {
      if (condition === "all") {
        setAuctionsShow(auctions);
      } else {
        const conditionArray = [...auctionsShow].filter(
          (auction) => auction.condition === condition
        );
        setAuctionsShow(conditionArray);
      }
    } else {
      setAuctionsShow(auctions);
    }
  };

  const filterCat = () => {
    if (categories.length > 0) {
      const categoriesArray = [...auctionsShow].filter((auction) =>
        auction.categories.some((category) => categories.indexOf(category) >= 0)
      );
      setAuctionsShow(categoriesArray);
    } else {
      setAuctionsShow(auctions);
    }
  };

  const handleCategoriesChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategories(typeof value === "string" ? value.split(",") : value);
  };

  const loadMoreAuctions = () => {
    setLoadMore(true);
    setLoadElements(loadElements + 5);
  };

  const getAuctions = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/auctions`);
      setAuctions(res.data);
      setAuctionsShow(res.data.slice(0, loadElements));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar show={false} />
      <div className="exploreLanding">
        <h1 className="exploreLandingTitle fade-in">Explore</h1>
      </div>
      <div className="explore">
        <div className="options">
          <div className="searchBar">
            <input
              className="searchQueryInput"
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="searchQuerySubmit" type="submit">
              <svg
                style={{ width: "24px", height: "24px" }}
                viewBox="0 0 24 24"
              >
                <path
                  fill="#666666"
                  d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                />
              </svg>
            </button>
          </div>
          <div className="filtering">
            <div className="filteringSelect">
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Filters</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    className="filterItem"
                    label="Filters"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <MenuItem value={"all"}>All Auctions</MenuItem>
                    <MenuItem value={"live"}>Live Auctions</MenuItem>
                    <MenuItem value={"ended"}>Ended Auctions</MenuItem>
                    <MenuItem value={"popular"}>Popular Auctions</MenuItem>
                    <MenuItem value={"last_minute"}>
                      Last Minute Auctions
                    </MenuItem>
                    <MenuItem value={"new"}>New Auctions</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Condition
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    className="filterItem"
                    label="Condition"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                  >
                    <MenuItem value={"all"}>All</MenuItem>
                    <MenuItem value={"new"}>New</MenuItem>
                    <MenuItem value={"used"}>Used</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-chip-label">Categories</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  className="filterItemCategories"
                  label="Categories"
                  multiple
                  value={categories}
                  onChange={handleCategoriesChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {category.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        {auctions.length > 0 ? (
          auctionsShow.length > 0 ? (
            <>
              <div className="cards">
                {auctionsShow.map((auction) =>
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
              {loadElements <= auctionsShow.length ? (
                <button
                  className="loadMorCardsExploreeBtn"
                  onClick={loadMoreAuctions}
                >
                  {loadMore ? "Loading..." : "Load More"}
                </button>
              ) : (
                ""
              )}
            </>
          ) : (
            <div className="centerNoResult">
              <h1>No result</h1>
            </div>
          )
        ) : (
          <div className="centerNoResult">
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

export default Explore;
