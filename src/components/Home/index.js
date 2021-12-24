import React from "react";
import Typewriter from "typewriter-effect";
import { Carousel } from "@trendyol-js/react-carousel";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import Navbar from "./../Navbar";
import Card from "./../Card";
import Footer from "./../Footer";
import "./style.css";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="homeLanding">
        <div className="homeLandingTitleLogo">
          <img
            className="homeLandingLogo fade-in"
            src="./logo.png"
            alt="logo"
          />
          <h1 className="homeLandingTitle fade-in">&nbsp;MAZAD</h1>
        </div>
        <h1 className="homeLandingDesc fade-in">
          <Typewriter
            options={{
              strings: ["Sell", "Buy"],
              autoStart: true,
              loop: true,
            }}
          />
          anything in less than a minute
        </h1>
      </div>
      <div className="homeShow fade-in">
        <div className="showCardsBox">
          <div className="showCardsBoxTitle">
            <div className="titleAndEmoji">
              <span role="img" aria-label="Time" className="homeCardsEmoji">
                ⏳
              </span>
              <h1>&nbsp;Last Minute Auctions</h1>
            </div>
            <p>view more&nbsp;&#8594;</p>
          </div>
          <div className="showCards" rightArrow={null}>
            <Carousel
              show={3.5}
              swiping={true}
              infinite={false}
              className="cardsCarousel"
              rightArrow={<AiOutlineArrowRight className="carouselArrow" />}
              leftArrow={<AiOutlineArrowLeft className="carouselArrow" />}
            >
              {arr.map((ele) => {
                return <Card />;
              })}
            </Carousel>
          </div>
        </div>
        <div className="showCardsBox">
          <div className="showCardsBoxTitle">
            <div className="titleAndEmoji">
              <span role="img" aria-label="Fire" className="homeCardsEmoji">
                🔥
              </span>
              <h1>&nbsp;Popular Auctions</h1>
            </div>
            <p>view more&nbsp;&#8594;</p>
          </div>
          <div className="showCards">
            <Carousel
              show={3.5}
              swiping={true}
              infinite={false}
              className="cardsCarousel"
              rightArrow={<AiOutlineArrowRight className="carouselArrow" />}
              leftArrow={<AiOutlineArrowLeft className="carouselArrow" />}
            >
              {arr.map((ele) => {
                return <Card />;
              })}
            </Carousel>
          </div>
        </div>
        <div className="showCardsBox">
          <div className="showCardsBoxTitle">
            <div className="titleAndEmoji">
              <span role="img" aria-label="Sparkles" className="homeCardsEmoji">
                ✨
              </span>
              <h1>&nbsp;New Auctions</h1>
            </div>
            <p>view more&nbsp;&#8594;</p>
          </div>
          <div className="showCards">
            <Carousel
              show={3.5}
              swiping={true}
              infinite={false}
              className="cardsCarousel"
              rightArrow={<AiOutlineArrowRight className="carouselArrow" />}
              leftArrow={<AiOutlineArrowLeft className="carouselArrow" />}
            >
              {arr.map((ele) => {
                return <Card />;
              })}
            </Carousel>
          </div>
        </div>
      </div>
      <div className="homeHowItWorks fade-in">
        <h1 className="homeHowItWorksTitle">How It Works</h1>
        <div className="homeHowItWorksType">
          <h1 className="homeHowItWorksTypeTitle">Buyer</h1>
          <div className="homeHowItWorksSteps">
            <div>
              <img
                src="./img/account.svg"
                alt="account img"
                className="homeHowItWorksStepsImg"
              />
              <div className="homeHowItWorksStepsNumber">1</div>
              <div>Create a new accout or login if you already have one</div>
            </div>
            <div>
              <img
                src="./img/bid.svg"
                alt="bid img"
                className="homeHowItWorksStepsImg"
              />
              <div className="homeHowItWorksStepsNumber">2</div>
              <div>Bid on the auction you want</div>
            </div>
            <div>
              <img
                src="./img/win.svg"
                alt="win img"
                className="homeHowItWorksStepsImg"
              />
              <div className="homeHowItWorksStepsNumber">3</div>
              <div>
                If you are the highest bidder, congrats you win the auction
              </div>
            </div>
          </div>
        </div>
        <div className="homeHowItWorksType">
          <h1 className="homeHowItWorksTypeTitle">Seller</h1>
          <div className="homeHowItWorksSteps">
            <div>
              <img
                src="./img/account.svg"
                alt="account img"
                className="homeHowItWorksStepsImg"
              />
              <div className="homeHowItWorksStepsNumber">1</div>
              <div>Create a new accout or login if you already have one</div>
            </div>
            <div>
              <img
                src="./img/auction.svg"
                alt="auction img"
                className="homeHowItWorksStepsImg"
              />
              <div className="homeHowItWorksStepsNumber">2</div>
              <div>Make a new auction for the item you want to sell</div>
            </div>
            <div>
              <img
                src="./img/sold.svg"
                alt="sold img"
                className="homeHowItWorksStepsImg"
              />
              <div className="homeHowItWorksStepsNumber">3</div>
              <div>
                Congrats you sold the item, now it's time so send it to the
                buyer
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
