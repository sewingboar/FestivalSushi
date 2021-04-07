import React from "react";
import "./cart-item.scss";
// import Ripples from "react-ripples";

const CartItem = ({
  id,
  name,
  price,
  defaultAmount,
  weight,
  amount,
  onDelete
}) => {
  return (
    <div key={id} className="cart-product" onClick={() => onDelete()}>
      <div className="major-info">
        <div className="major-info__title">{name}</div>
      </div>
      <div className="secondary-info">
        <div className="secondary-info__price">{price}₴</div>
        <div className="secondary-info__quantity">{amount} шт.</div>
      </div>
      {/* <Ripples style={{height: '48px', width:'100%'}}> */}
      <div className="delete">Видалити</div>
      {/* </Ripples> */}
    </div>
  );
};

export default CartItem;
