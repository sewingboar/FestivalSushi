import React from "react";
import "./contacts.scss";

import { GoogleMap, PlacesList } from "../../pages-components/contacts";

const Contacts = () => {
  return (
    <section className="contacts">
      <div className="contacts-wrapper card">
        <GoogleMap />
        <PlacesList />
      </div>
    </section>
  );
};

export default Contacts;
