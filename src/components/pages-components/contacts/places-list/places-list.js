import React from "react";
import "./places-list.scss";
import PlacesListItem from "../places-list-item";
import { connect } from "react-redux";

const PlacesList = ({ places, cities, cityId }) => {
  const city = cities.find(({ id }) => id === cityId);
  const renderInfoItems = item => {
    return <PlacesListItem {...item} key={item.id} />;
  };

  return (
    <div className="contacts-wrapper__info">
      <div className="info-header">
        <div className="info-header__row">
          <span>Горяча лінія: </span>
          <span className="info-header__hot-line-number">
            {city ? city.default_phone_number : null}
          </span>
        </div>
        <div className="info-header__divider divider" />
      </div>
      <div className="info-content">{places.map(renderInfoItems)}</div>
    </div>
  );
};

const mapStateToProps = ({ places, cities, selectedCity }) => {
  return {
    places: places,
    cities: cities,
    cityId: selectedCity
  };
};

export default connect(mapStateToProps)(PlacesList);
