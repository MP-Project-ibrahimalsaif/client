import React from "react";
import Typewriter from "typewriter-effect";
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
          <Typewriter
            options={{
              strings: ['Sell', 'Buy'],
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
          <div className="showCards">
            <Flicking align="prev" circular={true} onMoveEnd={(e) => {}}>
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
            <Flicking align="prev" circular={true} onMoveEnd={(e) => {}}>
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
            <Flicking align="prev" circular={true} onMoveEnd={(e) => {}}>
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
      <div className="homeHowItWorks fade-in">
        <h1 className="homeHowItWorksTitle">How It Works</h1>
        <div className="homeHowItWorksType">
          <h1 className="homeHowItWorksTypeTitle">Buyer</h1>
          <div className="homeHowItWorksSteps">
            <div>
              <img src="./img/account.svg" className="homeHowItWorksStepsImg" />
              <div className="homeHowItWorksStepsNumber">1</div>
              <div>Create a new accout or login if you already have one</div>
            </div>
            <div>
              <img src="./img/bid.svg" className="homeHowItWorksStepsImg" />
              <div className="homeHowItWorksStepsNumber">2</div>
              <div>Bid on the auction you want</div>
            </div>
            <div>
              <img src="./img/win.svg" className="homeHowItWorksStepsImg" />
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
              <img src="./img/account.svg" className="homeHowItWorksStepsImg" />
              <div className="homeHowItWorksStepsNumber">1</div>
              <div>Create a new accout or login if you already have one</div>
            </div>
            <div>
              <img src="./img/auction.svg" className="homeHowItWorksStepsImg" />
              <div className="homeHowItWorksStepsNumber">2</div>
              <div>Make a new auction for the item you want to sell</div>
            </div>
            <div>
              <img src="./img/sold.svg" className="homeHowItWorksStepsImg" />
              <div className="homeHowItWorksStepsNumber">3</div>
              <div>
                Congrats you sold the item, now it's time so send it to the
                buyer
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
