import React, { Component } from "react";
import "./products-list.scss";
import { connect } from "react-redux";
// import {Pagination} from './pagination.js'
import { withSushiStoreService } from "../../../hoc";
import { productsLoaded, productAddedToCart } from "../../../../actions";
import ProductListItem from "../product-list-item";
import classNames from "classnames";
import Pagination from "../../pagination/pagination";


class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      dnone: true
    };
    this.addClass = this.addClass.bind(this);
    // this.renderCartItems = this.renderCartItems.bind(this);
    this.removeClass = this.removeClass.bind(this);
  }

  addClass() {
    this.setState({
      dnone: true
    });
  }

  removeClass() {
    this.setState({
      dnone: false
    });
  }

  componentDidMount() {
    const { sushiStoreService, productsLoaded } = this.props;

    sushiStoreService
      .getProductsBlock()
      .then(products => productsLoaded(products))
  }

  render() {
    const { products, productAddedToCart, sushiStoreService } = this.props;

    return (<>
      <section
        className={classNames("products", {
          dnone: !this.props.displayProducts
        })}
      >
        {products.map(product => {
          return (
            <ProductListItem
              key={product.id}
              onAddProduct={() => productAddedToCart(product.id)}
              sushiStoreService={sushiStoreService}
              {...product}
            />
          );
        })}
      </section>
      <section className={classNames("", {
          dnone: !this.props.displayProducts
        })}>
            <Pagination />
        </section>
        
        </>
    );
  }
}

const mapStateToProps = state => {
  return {
    displayProducts: state.displayProducts,
    products: state.productsBlock,
    isLoading: state.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    productsLoaded: products => dispatch(productsLoaded(products)),
    productAddedToCart: productId => dispatch(productAddedToCart(productId))
  };
};

export default withSushiStoreService()(
  connect(mapStateToProps, mapDispatchToProps)(ProductList)
);
