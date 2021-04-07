import React from "react";
import "./product-list-item.scss";

const ProductListItem = ({
  image,
  name,
  stock,
  composition,
  amount,
  price,
  onAddProduct,
  sushiStoreService
}) => {
  return (
    <div className="product">
      <div className="product-header">
        <img
          className="product-header__image"
          src={sushiStoreService.getImage(image)}
          alt={name}
        />
        {stock ? (
          <span className="product-header__discount">{stock}%</span>
        ) : null}
      </div>
      <div className="product-content">
        <div className="product-content__title">{name}</div>
        <div className="product-content__composition">{composition}</div>
        <div className="product-content__data">{amount} шт.</div>
      </div>
      <div
        className="product-footer"
        style={{ display: "inline-block", overflow: "hidden" }}
      >
          <button onClick={() => onAddProduct()} className="product-footer__button">{price}₴</button>
      </div>
    </div>
  );
};

export default ProductListItem;
