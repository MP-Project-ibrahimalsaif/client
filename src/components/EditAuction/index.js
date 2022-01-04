import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import ImageUploader from "react-images-upload";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useSnackbar } from "notistack";
import { storage } from "./../firebase";
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

const EditAuction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pictures, setPictures] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const [initialPrice, setInitialPrice] = useState("");
  const [minIncrement, setMinIncrement] = useState("");
  const [condition, setCondition] = useState("");
  const [categories, setCategories] = useState([]);
  const [dateTime, setDateTime] = useState(null);
  const [cardData, setCardData] = useState(null);
  const [auction, setAuction] = useState(null);

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
      user: state.Login.user,
    };
  });

  useEffect(() => {
    getAuction();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (auction) {
      setCardData({
        title,
        images: urls.length > 0 ? urls : auction.images,
        initialPrice,
        endDateTime: dateTime,
        createdBy: { avatar: auction.createdBy.avatar },
      });
    }
    // eslint-disable-next-line
  }, [title, urls, initialPrice, dateTime]);

  const handleSnackbar = (message, type) => {
    enqueueSnackbar(message, {
      variant: type,
    });
  };

  const getAuction = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/auctions/${id}`
      );
      setAuction(res.data.auction);
      setDateTime(res.data.auction.endDateTime);
    } catch (error) {
      console.log(error);
    }
  };

  const onDrop = (picture) => {
    setPictures(picture);
  };

  const handleCategoriesChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategories(typeof value === "string" ? value.split(",") : value);
  };

  const handleUpload = () => {
    const promises = [];
    pictures.forEach((image) => {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((urls) => {
              setUrls((prevState) => [...prevState, urls]);
            });
        }
      );
    });

    Promise.all(promises)
      .then(() => console.log("All images uploaded"))
      .catch((err) => console.log(err));
  };

  const editAuction = async () => {
    if (
      title &&
      description &&
      urls &&
      initialPrice &&
      minIncrement &&
      condition &&
      categories &&
      dateTime
    ) {
      try {
        if (dateTime > new Date()) {
          await axios.put(
            `${process.env.REACT_APP_BASE_URL}/auctions/${id}`,
            {
              title,
              description,
              images: urls.length > 0 ? urls : auction.images,
              initialPrice,
              minIncrement,
              categories:
                categories.length > 0 ? categories : auction.categories,
              endDateTime: dateTime,
              condition,
            },
            {
              headers: {
                Authorization: `Bearer ${state.token}`,
              },
            }
          );
          handleSnackbar(
            "your auction has been updated successfully",
            "success"
          );
          navigate("/");
        } else {
          handleSnackbar(
            "the time of the auction must be in the future",
            "error"
          );
        }
      } catch (error) {
        console.log(error);
        handleSnackbar("oops something went wrong", "error");
      }
    } else {
      handleSnackbar(
        "all fields are required, make sure to fill every field correctly",
        "error"
      );
    }
  };

  return (
    <>
      <Navbar show={false} />
      <div className="editAuctionLanding">
        <h1 className="editAuctionLandingTitle fade-in">
          Edit {auction ? auction.title : "an"} auction
        </h1>
      </div>
      <div className="editAuction">
        {state.token ? (
          <>
            {auction ? (
              <>
                <div className="editAuctionLayout">
                  <div className="editAuctionInfo">
                    <div className="editAuctionInfoLeft">
                      <div className="editAuctionItem">
                        <label>Title</label>
                        <TextField
                          id="outlined-basic"
                          defaultValue={auction.title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                      </div>
                      <div className="editAuctionItem">
                        <label>Description</label>
                        <TextField
                          id="outlined-textarea"
                          defaultValue={auction.description}
                          onChange={(e) => setDescription(e.target.value)}
                          multiline
                          rows={2}
                          required
                        />
                      </div>
                      <div className="editAuctionItem">
                        <label>Images</label>
                        <p className="imageDesc">
                          After choosing all the images cclick on the upload
                          button, hint: the first image will be the cover of
                          your auction card
                        </p>
                        <ImageUploader
                          withIcon={false}
                          withPreview={true}
                          label="Max file size: 5mb, accepted: jpg"
                          buttonText="Choose images"
                          className="ImageUploader"
                          buttonClassName="ImageUploaderBtn"
                          onChange={onDrop}
                          imgExtension={[".jpg"]}
                          maxFileSize={5242880}
                        />
                        <progress
                          value={progress}
                          max="100"
                          className="progressBar"
                        />
                        <button onClick={handleUpload} className="UploadBtn">
                          Upload
                        </button>
                      </div>
                    </div>
                    <div className="editAuctionInfoRight">
                      <div className="editAuctionItem">
                        <label>Initial price</label>
                        <OutlinedInput
                          id="outlined-adornment-amount"
                          defaultValue={auction.initialPrice}
                          onChange={(e) => {
                            if (Number.isInteger(Number(e.target.value))) {
                              setInitialPrice(e.target.value);
                            }
                          }}
                          required
                          endAdornment={
                            <InputAdornment position="end">SAR</InputAdornment>
                          }
                        />
                      </div>
                      <div className="editAuctionItem">
                        <label>Minimum increment</label>
                        <OutlinedInput
                          id="outlined-adornment-amount"
                          defaultValue={auction.minIncrement}
                          onChange={(e) => {
                            if (Number.isInteger(Number(e.target.value))) {
                              setMinIncrement(e.target.value);
                            }
                          }}
                          required
                          endAdornment={
                            <InputAdornment position="end">SAR</InputAdornment>
                          }
                        />
                      </div>
                      <div className="editAuctionItem">
                        <label>Condition</label>
                        <Select
                          id="demo-simple-select"
                          defaultValue={auction.condition}
                          required
                          onChange={(e) => setCondition(e.target.value)}
                        >
                          <MenuItem value={"new"}>New</MenuItem>
                          <MenuItem value={"used"}>Used</MenuItem>
                        </Select>
                      </div>
                      <div className="editAuctionItem">
                        <label>Categories</label>
                        <Select
                          labelId="demo-multiple-chip-label"
                          multiple
                          defaultValue={auction.categories}
                          onChange={handleCategoriesChange}
                          input={
                            <OutlinedInput
                              id="select-multiple-chip"
                              label="Chip"
                            />
                          }
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
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
                      <div className="editAuctionItem">
                        <label>End of auction</label>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DateTimePicker
                            renderInput={(params) => <TextField {...params} />}
                            disablePast
                            value={dateTime}
                            onChange={(newValue) => {
                              setDateTime(newValue);
                            }}
                          />
                        </LocalizationProvider>
                      </div>
                    </div>
                  </div>
                  <div className="editAuctionPreview">
                    <h2>Preview item</h2>
                    {cardData && <Card preview={true} data={cardData} />}
                  </div>
                </div>
                <button onClick={editAuction} className="SubmitBtn">
                  Update
                </button>
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
          </>
        ) : (
          <div className="error">
            <img src="/img/stop.svg" className="errorImg" alt="error" />
            <h1 className="errorText">You are not logged in yet</h1>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default EditAuction;
