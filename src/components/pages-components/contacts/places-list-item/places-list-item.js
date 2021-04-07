import React from "react";

import "./places-list-item.scss";

const PlacesListItem = ({ name, address, phone_number }) => {
  return (
    <div className="info-content-row">
      <div className="info-content-row__top">
        <span>{name}</span>
        <span>{address}</span>
        {/* <span>{name + " " + address}</span> */}
        {/*<span>{address}</span>*/}
      </div>
      <div className="info-content-row__bottom">{phone_number}</div>
    </div>
  );
};

export default PlacesListItem;
