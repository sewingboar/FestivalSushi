import React from "react";
import "./landing.scss";
import isMobile from "react-device-detect"

import { LandingCities } from "../../pages-components";
import { Carousel } from "../../pages-components";
import { LandingLogo } from "../../pages-components";

const Landing = () => {
  return (
    //<div className="land-wrapper">
      <React.Fragment>
        <LandingLogo />
        <LandingCities />
        <a className = "land-insta" href='https://www.instagram.com/festivalsushi.com.ua/'>
        <p className = "land-insta--text">Тепер і в Instagram!</p>
        <img className = "land-insta--logo" src = 'img/IG_log.png' alt="instagram account" />
        </a>
        {isMobile ? null : <Carousel />}
      </React.Fragment>
    //</div>
  );
};

export default Landing;
