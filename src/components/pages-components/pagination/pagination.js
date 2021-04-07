import React from "react";
import { connect } from "react-redux";
import "./pagination.scss";

import {
  productPaginationBackward,
  productPaginationForward
} from "../../../actions";

const Pagination = ({
  productPaginationForward,
  productPaginationBackward,
  paginationPage,
  productsBlock,
  productsPerPage
}) => {
  const forward =
    productsBlock.length === productsPerPage ? (
      <div onClick={productPaginationForward} className="pagination__forward">
        <img className="load-more__img" src="img/forward.png" alt="" />
      </div>
    ) : null;

  const backward =
    paginationPage !== 1 ? (
      <div onClick={productPaginationBackward} className="pagination__backward">
        <img className="load-more__img" src="img/backward.png" alt="" />
      </div>
    ) : null;

  return (
    <div className="pagination">
      {forward}
      {backward}
    </div>
  );
};

const mapStateToProps = ({
  paginationPage,
  productsBlock,
  productsPerPage
}) => {
  return {
    paginationPage: paginationPage,
    productsPerPage: productsPerPage,
    productsBlock: productsBlock
  };
};

const mapDispatchToProps = dispatch => {
  return {
    productPaginationForward: () => dispatch(productPaginationForward()),
    productPaginationBackward: () => dispatch(productPaginationBackward())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
