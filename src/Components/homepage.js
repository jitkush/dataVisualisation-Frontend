import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Homepage = () => {
  const navigate = useNavigate();

  const request = {};
  const handleClick = (e) => {
    console.log(e.target.name);
    if (e.target.name == "upload") {
      navigate("/upload");
    } else if (e.target.name == "3DD") {
      navigate("/3DD");
    }
  };
  return (
    <div className="homepage">
      <div className="homePageContainer">
        <h1>PRAAN</h1>
        <button className="homepageButton" name="upload" onClick={handleClick}>
          Upload file
        </button>
        <button className="homepageButton" name="3DD" onClick={handleClick}>
          Three location data
        </button>
        <button className="homepageButton" name="ApiTestOne">
          {" "}
          PM readind of different devices
        </button>
      </div>
    </div>
  );
};

export default Homepage;
