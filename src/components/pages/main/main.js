import React from "react";
import "./main.scss";

import { Cart, ProductList, CategoryList } from "../../pages-components";
// import Pagination from "../../pages-components/pagination/pagination";

const MainPage = () => {
  return (
    <React.Fragment>
      <CategoryList />
      <section className="main">
        <div className="main__content">
          <ProductList />
        </div>
        <Cart />
      </section>
      {/* <Pagination /> */}
    </React.Fragment>
  );
};

export default MainPage;
