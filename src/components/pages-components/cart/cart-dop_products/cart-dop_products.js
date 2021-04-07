import React from "react";
import './cart-dop_products.scss';

const DopItem = ({image, name, composition, amount, weight = '111', price, onAddProduct, sushiStoreService}) => {

    return (
        <div className="dop_product">
            <div className="dop_product-header">
                <img className="dop_product-header__image" src={sushiStoreService.getImage(image)} alt={name}/>
            </div>
            <div className="dop_product-content">
                <div className="dopproduct-content__title">{name}</div>
                <div className="product-content__composition">{composition}</div>
                <div className="product-content__data">{amount} шт.</div>
            </div>
            <div className="product-footer">
                <button onClick={() => onAddProduct()} className="product-footer__button">₴{price}</button>
            </div>
        </div>
    )
};

export default DopItem;