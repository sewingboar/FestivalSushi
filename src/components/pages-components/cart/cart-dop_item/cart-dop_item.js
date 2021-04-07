import React from "react";
import "./cart-dop_item.scss";

const DopItem = ({ image, name, composition, amount, price, onAddProduct, sushiStoreService }) => {
  return (
    <div className="dop_product">
      <div className="dop_product-header">
        <img className="dop_product-header__image" src={sushiStoreService.getImage(image)} alt={name} />
      </div>
      <div className="dop_product-content">
        <div className="dop_product-content__title">{name}</div>
        <div className="dop_product-content__composition">{composition}</div>
      </div>
      <div className="dop_product-footer">
          <button onClick={() => onAddProduct()} className="dop_product-footer__button">{price}₴</button>
      </div>
    </div>
  );
};

export default DopItem;