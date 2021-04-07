import React from "react";
import "./cart-main.scss";
import { withSushiStoreService } from "../../../hoc";
import CartItem from "../cart-item";
import DopItem from "../cart-dop_item/cart-dop_item";
import {
  productDeletedFromCart,
  productAddedToCart,
  processToDop,
  processToCheckout,
  displayProductsAction
} from "../../../../actions";
import { connect } from "react-redux";
import Ripples from "react-ripples";

const CartMain = ({
  items,
  totalPrice,
  onDelete,
  processToDop,
  processToCheckout,
  displayProductsAction,
  productAddedToCart,
  cartDop,
  sushiStoreService,
  products
}) => {
  const renderCartItems = item => {
    return (
      <CartItem {...item} key={item.id} onDelete={() => onDelete(item.id)} />
    );
  };

  const renderDopItems = product => {
    return (
      <DopItem
        key={product.id}
        onAddProduct={() => productAddedToCart(product.id)}
        sushiStoreService={sushiStoreService}
        {...product}
      />
    );
  };
  const toDelete = new Set([68, 69]);
  const tempDopProducts = products.filter(
    ({ category_id }) => category_id === 7
  );
  const dopProducts = tempDopProducts.filter(obj => !toDelete.has(obj.id));

  const handleDop = products => {
    displayProductsAction();
    processToDop();
  };

  const handleBack = () => {
    processToDop();
    displayProductsAction();
  };

  let mainCartButton;
  let cartMain;
  let cartDopProducts;

  if (totalPrice === 0) {
    mainCartButton = (
      <button className="cart__button inactive">Корзина порожня</button>
    );
  } else {
    mainCartButton = (
      <Ripples onClick={() => handleDop(products)}>
        <button className="cart__button">Далі</button>
      </Ripples>
    );
  }
  if (cartDop) {
    cartDopProducts = (
      <section className="dop_Products">
        {dopProducts.map(renderDopItems)}
      </section>
    );
  } else cartDopProducts = null;

  if (cartDop) {
    cartMain = (
      <section className="cart">
        <div className="cart-header">
          <div className="cart-header__title">Додатки</div>
          <div className="cart__divider" />
        </div>
        <div className="cart__products">{items.map(renderCartItems)}</div>
        <div className="cart__divider" />
        <div className="cart__warning">
          Контейнери додаються автоматично
        </div>
        <div className="cart-footer">
          <div className="cart-total">
            <div className="cart-total__text">Всього</div>
            <div className="cart-total__subtotal">
              {totalPrice.toFixed(2)} ₴
            </div>
          </div>
        </div>
        <div className="cart--btn__wrapper">
          <button
            className="cart__button back"
            style={{
              display: "inline-block",
              overflow: "hidden",
              width: "50%"
            }}
            onClick={() => handleBack()}
          >
            Назад
          </button>
          <button
            style={{
              display: "inline-block",
              overflow: "hidden",
              width: "50%"
            }}
            onClick={() => processToCheckout()}
            className="cart__button cart__button--next"
          >
            Замовити
          </button>
        </div>
      </section>
    );
  } else
    cartMain = (
      <section className="cart">
        <div className="cart-header">
          <div className="cart-header__title">Корзина</div>
          <div className="cart__divider" />
        </div>
        <div className="cart__products">{items.map(renderCartItems)}</div>
        <div className="cart__divider" />
        <div className="cart__warning">
          Контейнери додаються автоматично
        </div>
        <div className="cart-footer">
          <div className="cart-total">
            <div className="cart-total__text">Всього</div>
            <div className="cart-total__subtotal">
              {totalPrice.toFixed(2)} ₴
            </div>
          </div>
        </div>
        {mainCartButton}
      </section>
    );

  return (
    <>
      {cartDopProducts}
      {cartMain}
    </>
  );
};

const mapStateToProps = ({ cartItems, totalPrice, cartDop, products }) => {
  return {
    items: cartItems,
    cartDop: cartDop,
    products: products,
    totalPrice: totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDelete: productId => dispatch(productDeletedFromCart(productId)),
    displayProductsAction: () => dispatch(displayProductsAction()),
    processToCheckout: () => dispatch(processToCheckout()),
    productAddedToCart: productId => dispatch(productAddedToCart(productId)),
    processToDop: () => dispatch(processToDop())
  };
};

export default withSushiStoreService()(
  connect(mapStateToProps, mapDispatchToProps)(CartMain)
);
