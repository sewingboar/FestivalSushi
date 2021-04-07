import React from 'react';
//import './cart-dop.scss'
import CartItem from "../cart-item";
import DopItem from "../cart-dop_item/cart-dop_item"
import "../cart-dop_item/cart-dop_item.scss"
import {productDeletedFromCart, processToCheckout, processToMain, productAddedToCart} from '../../../../actions';
import {withSushiStoreService} from '../../../hoc';
import {connect} from 'react-redux';

const CartDop = ({items, totalPrice, onDelete, processToCheckout, sushiStoreService}) => {
    
    const renderCartItems = (item) => {
        return <CartItem
            {...item}
            key={item.id}
            onDelete={() => onDelete(item.id)}/>;
    };

    // categoryWasSelected

return (
    <>
    <section className="cart">
        <div className="cart-header">
            <div className="cart-header__title">Доп.</div>
            <div className=""></div>
        </div>
        <div className="cart__products">
            {
                items.map(renderCartItems)
            }
        </div>
        <div className="cart__divider"/>
            <div className="cart-footer">
                <div className="cart-total">
                    <div className="cart-total__text">Итого</div>
                    <div className="cart-total__subtotal">{totalPrice} ₴</div>
                </div>
                {/* <button onClick={() => processToMain()} className="cart-footer__button btn_back">Назад</button> */}
                <button onClick={() => processToCheckout()} className="cart__button">Оформить заказ</button>
            </div>
    </section>
    </>
)



};

const mapStateToProps = ({cartItems, totalPrice}) => {
    return {
        items: cartItems,
        totalPrice: totalPrice
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (productId) => dispatch(productDeletedFromCart(productId)),
        processToCheckout: () => dispatch(processToCheckout()),
        processToMain: () => dispatch(processToMain()),
        productAddedToCart: (DopItem) => dispatch(productAddedToCart(DopItem.id))
    }
};

export default withSushiStoreService()(connect(mapStateToProps, mapDispatchToProps)(CartDop));