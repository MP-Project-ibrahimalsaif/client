import React from "react";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import Navbar from "./../Navbar";
import "./style.css";

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
          <span></span>&nbsp;anything in less than a minute
        </h1>
      </div>
      <div className="homeShow">
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
          <div className="showCards">
            <Flicking
              align="prev"
              circular={true}
              onMoveEnd={(e) => {}}
            >
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
            </Flicking>
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
            <Flicking
              align="prev"
              circular={true}
              onMoveEnd={(e) => {}}
            >
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
            </Flicking>
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
            <Flicking
              align="prev"
              circular={true}
              onMoveEnd={(e) => {}}
            >
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
            </Flicking>
          </div>
        </div>
      </div>
      <div className="homeHowItWorks">
        <h1 className="homeHowItWorksTitle">How It Works</h1>
        <div className="homeHowItWorksCustomer">
          <h1 className="homeHowItWorksCustomerTitle">Buyer</h1>
          <div className="homeHowItWorksCustomerSteps">
            <div>
              <img src="./account.png" className="homeHowItWorksCustomerStepsImg" />
              <div className="homeHowItWorksCustomerStepsNumber">1</div>
              <div>Create a new accout or login if you already ahve one</div>
            </div>
            <div>
              <img src="./bid.png" className="homeHowItWorksCustomerStepsImg" />
              <div className="homeHowItWorksCustomerStepsNumber">2</div>
              <div>Bid on the auction you want</div>
            </div>
            <div>
            <img src="./win.png" className="homeHowItWorksCustomerStepsImg" />
              <div className="homeHowItWorksCustomerStepsNumber">3</div>
              <div>If you are the hightest bidder, congrats you win the auction</div>
            </div>
          </div>
        </div>
        <div className="homeHowItWorksCustomer">
          <h1 className="homeHowItWorksCustomerTitle">Seller</h1>
          <div className="homeHowItWorksCustomerSteps">
            <div>1 user</div>
            <div>2 make an auction</div>
            <div>3 win</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

const Emoji = (props) => (
  <option
    className="emoji"
    role="img"
    aria-label={props.label ? props.label : ""}
    aria-hidden={props.label ? "false" : "true"}
    value={props.label}
  >
    {props.symbol}
  </option>
);
