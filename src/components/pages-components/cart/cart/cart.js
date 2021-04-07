import React from 'react';
import './cart.scss';
import CartMain from "../cart-main/cart-main";
import Checkout from "../checkout/checkout";
import {connect} from "react-redux";

const Cart = ({cartCheckout, cartDop, cartMain}) => {
    return (
        <React.Fragment>
            {/* {cartDop ? <CartDop_Products/> : null} */}
            {!cartCheckout ? <CartMain/> : <Checkout/>}
        </React.Fragment>
    )
};

const mapStateToProps = ({cartCheckout, cartDop, cartMain}) => {
    return {
        cartDop: cartDop,
        cartMain: cartMain,
        cartCheckout: cartCheckout
    }
};

export default connect(mapStateToProps)(Cart);