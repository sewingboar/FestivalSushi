import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./landing-cities.scss";
import { withSushiStoreService } from "../../hoc";
import { citiesLoaded, cityWasSelected } from "../../../actions";

class LandingCities extends Component {
  componentDidMount() {
    const { citiesLoaded, sushiStoreService } = this.props;
    sushiStoreService.getCities().then(cities => citiesLoaded(cities));
  }

  render() {
    const { cities, selectedCity, cityWasSelected } = this.props;
    let cityImg = null;
    return (
      <div className="landciti">
        <div className="landciti-header__title">Місто</div>
        <div className="landciti-header__image">
          <a className = "landciti-header__image-insta" href='https://www.instagram.com/festivalsushi.com.ua/'>
        <p className = "landciti-header__image-insta--text">Тепер і в Instagram!</p>
        <img className = "landciti-header__image-insta--logo" src = 'img/IG_log.png' alt="instagram account" />
        </a>
        </div>
        <div>
          {cities.map(city => {
            cityImg = `img/cities/${city.id}.png`;
            return (
              <Link
                key={city.id}
                to="/store"
                style={{ textDecoration: "none" }}
              >
                <button
                  key={city.id}
                  onClick={_ => cityWasSelected(city.id)}
                  className={
                    city.id === selectedCity
                      ? "button landciti-header__button--active"
                      : "button landciti-header__button"
                  }
                >
                  <img className="button__img" src={cityImg} alt="City icon" />
                  <span className="button__text">{city.name}</span>
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ cities, selectedCity }) => {
  return {
    cities: cities,
    selectedCity
  };
};

const mapDispatchToProps = dispatch => {
  return {
    citiesLoaded: cities => dispatch(citiesLoaded(cities)),
    cityWasSelected: city => dispatch(cityWasSelected(city))
  };
};

export default withSushiStoreService()(
  connect(mapStateToProps, mapDispatchToProps)(LandingCities)
);
