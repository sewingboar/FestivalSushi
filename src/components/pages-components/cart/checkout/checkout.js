import React, { Component } from "react";
import "./checkout.scss";
import "../../../pages/contacts/contacts.scss";
import { GoogleMap, PlacesList } from "../../contacts";
import { connect } from "react-redux";
import Select from "../../select";
import { withSushiStoreService } from "../../../hoc";
import {
  deliveryTypeWasChanged,
  placesLoaded,
  placeWasSelected,
  productDeletedFromCart
} from "../../../../actions";
import classNames from "classnames";
import { isMobile, isTablet, } from "react-device-detect";

class Checkout extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      dblock: false,
      delivery: false
    };
    this.addClass = this.addClass.bind(this);
    // this.removeClass = this.removeClass.bind(this);
  }

  addClass() {
    this.setState({
      dblock: true
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.selectedPlaceId === null) {
      alert("Оберіть торгову точку");
    } else {
      this.addClass();
      this.onCheckoutSubmit();
      // this.props.cartItems.map(({ id, amount }) => {
      //   productDeletedFromCart(id);
      //   console.log("product deleted from cart", id, amount);
      // });
      }
    }
  

  componentDidMount() {
    const { citiesLoaded, sushiStoreService, selectedCity } = this.props;

    sushiStoreService
      .getPlaceByCityId(selectedCity)
      .then(places => citiesLoaded(places))
  }

  onPlaceSelect = placeId => {
    const { placeWasSelected } = this.props;

    placeWasSelected(Number.parseInt(placeId));
  };

  onDeliveryTypeChange = e => {
    const { deliveryTypeWasChanged } = this.props;
    this.state.delivery = !this.state.delivery
    deliveryTypeWasChanged(+e.target.checked);
  };

  onCheckoutSubmit = () => {
    const {
      sushiStoreService,
      totalPrice,
      selectedPlaceId,
      cartItems,
      deliveryType
    } = this.props;
    const products = cartItems.map(({ id, amount }) => {
      return {
        id: id,
        amount: amount
      };
    });
    const formData = {
      products: products,
      delivery_type_id: deliveryType,
      form_data_name: document.getElementById("checkout-name").value,
      form_data_phone: document.getElementById("checkout-phone").value,
      form_data_email: document.getElementById("checkout-email").value,
      form_data_address: document.getElementById("checkout-address").value,
      place_id: selectedPlaceId,
      cart_total: totalPrice
    };

    sushiStoreService.sendCheckoutData(formData);
    // .then(data => alert(data.message));
  };


  render() {
    const { placeWasSelected, places } = this.props;
    var options = places.map(({ address, id, name }) => {
      return {
        name: name + " " + address,
        value: id
      };
    });
    let contactsElement;
    let placesElement = null;

    if (isMobile){
      contactsElement = null;
    } else if (isTablet){
      contactsElement = null; 
    }
    else       contactsElement = (
      <section className="contacts">
      <div className="checkout__contacts-wrapper">
        <GoogleMap />
        <PlacesList />
      </div>
    </section>
    ); 

    if (options.length > 0) {
      placesElement = (
        <Select
          callback={this.onPlaceSelect}
          name={"checkout_cities"}
          options={options}
        />
      );

      placeWasSelected(this.props.selectedPlaceId);
    }

    return (
      <>{contactsElement}
        <section className="checkout">
          <div className="checkout-header">
            <div className="checkout-header__title">Замовлення</div>
            <div className="checkout__divider" />
          </div>
          <div
            className={classNames("succesful__checkout dnone", {
              dblock: this.state.dblock
            })}
          >
            <p className="succesful__checkout--title">Дякуємо за замовлення</p>
            <p className="succesful__checkout--subtitle">
              Для підтвердження замовлення з вами в найближчий час зв'яжеться
              оператор.
            </p>
            <p className="succesful__checkout--subtitle emptyspace">
              Без підтвердження по телефону замовлення не є дійсним!
            </p>
          </div>

          <div className="checkout-content">
            <form
              className="checkout-content-form"
              id="checkoutForm"
              action=""
              onSubmit={this.handleSubmit}
            >
              {placesElement}
              <div className="toggler">
                <input
                  onChange={this.onDeliveryTypeChange}
                  type="checkbox"
                  name="delivery_type"
                  id="delivery_type"
                />
                <label htmlFor="delivery_type">
                  <div className="toggler-switcher">
                    <span className="toggler-switcher-lefter">Самовивіз</span>{" "}
                    <span>Доставка</span>
                  </div>
                </label>
              </div>

              <div className="checkout-content-form-input-group">
                <input
                  type="text"
                  name="name"
                  id="checkout-name"
                  placeholder="Ім'я"
                />
                <input
                  type="tel"
                  name="phone"
                  id="checkout-phone"
                  placeholder="Номер телефону (обовь'язково)"
                  pattern="\d{10}"
                  maxLength="10"
                  required
                />
                <input
                  type="text"
                  name="email"
                  id="checkout-email"
                  placeholder="Email"
                />
                <input
                  className={this.state.delivery ? "dblock" : "dnone"}
                  type="text"
                  name="address"
                  id="checkout-address"
                  placeholder="Адрес доставки"
                />
                <button type="submit" className="checkout-footer__button">
                  Замовити
                </button>
              </div>
            </form>
          </div>
          <div className="checkout-footer">
            <div className="checkout-footer__info">
              Для підтвердження замовлення з вами в найближчий час зв'яжеться
              оператор. Без підтвердження по телефону замовлення не є дійсним!
            </div>
            <div className="checkout__divider" />
            <div className="checkout-total">
              <div className="checkout-total__text">Всього</div>
              <div className="checkout-total__subtotal">
                {this.props.totalPrice.toFixed(2)} ₴
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = props => {
  const {
    totalPrice,
    places,
    selectedCity,
    selectedPlaceId,
    cartItems,
    deliveryType
  } = props;

  return {
    totalPrice,
    places,
    selectedCity,
    selectedPlaceId,
    cartItems,
    deliveryType
  };
};

const mapDispatchToProps = dispatch => {
  return {
    citiesLoaded: places => dispatch(placesLoaded(places)),
    placeWasSelected: placeId => dispatch(placeWasSelected(placeId)),
    deliveryTypeWasChanged: deliveryType =>
      dispatch(deliveryTypeWasChanged(deliveryType)),
    onDelete: productId => dispatch(productDeletedFromCart(productId))
  };
};

export default withSushiStoreService()(
  connect(mapStateToProps, mapDispatchToProps)(Checkout)
);
