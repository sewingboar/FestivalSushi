import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./footer.scss";
import { MobileView } from "react-device-detect";
import CartItem from "../cart/cart-item/cart-item";
import {
  productDeletedFromCart,
  processToCheckout,
  displayProductsAction
} from "../../../actions";
import { connect } from "react-redux";
import classNames from "classnames";
import "../cart/cart-item/cart-item.scss";

class Footer extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      dblock: false,
      displayFooterCart: true,
      displayCart: true
    };
    this.addClass = this.addClass.bind(this);
    // this.renderCartItems = this.renderCartItems.bind(this);
    this.removeClass = this.removeClass.bind(this);
  }

  addClass() {
    this.setState({
      dblock: true
    });
  }

  removeClass() {
    this.setState({
      dblock: false
    });
  }

  handleCheckout() {
    this.removeClass();
    this.props.processToCheckout();
  }

  handleBack() {
    this.setState({
      displayCart: !this.state.displayCart
    });

    this.removeClass();
    this.props.displayProductsAction();
  }

  handleClick() {

    if (this.state.displayCart) {
      this.setState({
        displayCart: !this.state.displayCart
      });
      this.addClass();
      this.props.displayProductsAction();
    }
    // else {
    //     this.removeClass();
    //     this.props.displayProductsAction();
    // };
  }

  render() {
    let isCartEmpty = this.props.totalPrice === 0;
    let cartButton;

    const renderCartItems = cartItem => {
      return (
        <CartItem
          {...cartItem}
          key={cartItem.id}
          onDelete={() => this.props.onDelete(cartItem.id)}
        />
      );
    };

    if (isCartEmpty) {
      cartButton = (
        <div className={classNames("footer__cart dnone", {
          dblock: !this.state.dblock})}>
          <img
            className="footer__cart--image"
            src="/img/cart_icon.png"
            alt="cart"
          ></img>
        </div>
      );
    } else {
      cartButton = (
        <div
          onClick={() => this.handleClick()}
          className={classNames("footer__cart--active dnone", {
            dblock: !this.state.dblock})}
        >
          
          <img
            className="footer__cart--image"
            src="/img/cart_icon.png"
            alt="cart"
          ></img>
          <button className="footer__cart--btn">
            {this.props.totalPrice.toFixed(2)}₴
          </button>
        </div>
      );
    }

    return this.props.location.pathname !== "/" ? (
      <>
        <section
          className={classNames("footer--cart dnone", {
            dblock: this.state.dblock
          })}
        >
          <div className="cart-header">
            <div className="cart-header__title">Корзина</div>
            <div className="cart__divider" />
          </div>
          <div className="footer--cart__products">
            {this.props.cartItems.map(renderCartItems)}
          </div>
          <div className="cart__divider" />
          <div className="cart__warning">
          Контейнери додаються автоматично
        </div>
          <div className="cart-footer">
            <div className="cart-total">
              <div className="cart-total__text">Итого</div>
              <div className="cart-total__subtotal">
                {this.props.totalPrice.toFixed(2)} ₴
              </div>
            </div>
          </div>
            <button className="footer--cart__btnback" 
            style={{display: 'inline-block',overflow: 'hidden',width: '50%'}} 
            onClick={() => this.handleBack()}>
              Назад
            </button>
            <button className="footer--cart__button" 
            style={{display: 'inline-block',overflow: 'hidden',width: '50%'}} 
            onClick={() => this.handleCheckout()}>
              Замовити</button>
        </section>
        <section className="footer">
          <div className="pages-links">
            <ul className="pages-links__list">
              <li className="pages-links__link">
                <Link to="/">Вибір міста</Link>
              </li>
              <li className="pages-links__link">
                <Link to="/store">Меню</Link>
              </li>
              {/* <li className="pages-links__link">
                                <Link to="/vacancies">Вакансии</Link>
                             </li>*/}
              <li className="pages-links__link">
                <Link to="/contacts">Контакти</Link>
              </li>
            </ul>
          </div>
          <MobileView>
            <div className="footer__cart--wrapper">{cartButton}</div>
          </MobileView>
        </section>
      </>
    ) : null;
  }
}

const mapStateToProps = props => {
  const { totalPrice, onDelete, processToCheckout, cartItems } = props;

  return {
    onDelete,
    processToCheckout,
    cartItems: cartItems,
    totalPrice: totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    displayProductsAction: () => dispatch(displayProductsAction()),
    onDelete: productId => dispatch(productDeletedFromCart(productId)),
    processToCheckout: () => dispatch(processToCheckout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
