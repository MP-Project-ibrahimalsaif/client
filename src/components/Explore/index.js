import React, { useState, useEffect } from "react";
import axios from "axios";
import OutlinedInput from "@mui/material/OutlinedInput";
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
  const [auctions, setAuctions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [condition, setCondition] = useState("");

  useEffect(() => {
    getAuctions();
    // eslint-disable-next-line
  }, []);

  const handleCategoriesChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategories(typeof value === "string" ? value.split(",") : value);
  };

  const getAuctions = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/auctions`);
      setAuctions(res.data);
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
            <Select
              id="demo-simple-select"
              className="filterItem"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            >
              <MenuItem value={"new"}>New</MenuItem>
              <MenuItem value={"used"}>Used</MenuItem>
            </Select>
            <Select
              id="demo-simple-select"
              className="filterItem"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            >
              <MenuItem value={"new"}>New</MenuItem>
              <MenuItem value={"used"}>Used</MenuItem>
            </Select>
            <Select
              labelId="demo-multiple-chip-label"
              className="filterItem"
              multiple
              value={categories}
              onChange={handleCategoriesChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
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
          </div>
        </div>
        <div className="cards">
          {auctions.map((auction) => {
            return <Card preview={false} data={auction} key={auction._id} />;
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Explore;
