import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./../Navbar";
import Card from "./../Card";
import Footer from "./../Footer";
import "./style.css";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getUserAuction();
    // eslint-disable-next-line
  }, []);

  const getUserAuction = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/${id}`
      );
      setProfile(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar show={true} />
      <div className="profile">
        {profile ? (
          <>
            <div className="profileInfo">
              <img src={profile.avatar} alt={`${profile.name} avatar`} />
              <h1>{profile.name}</h1>
            </div>
            <div className="profileTitle">
              <h1>{profile.name} Auctions</h1>
            </div>
            <div className="profileCards">
              {profile.auctions.map((auction) => {
                return (
                  <Card preview={false} data={auction} key={auction._id} />
                );
              })}
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

export default Profile;
