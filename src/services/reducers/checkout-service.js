export default class CheckoutService {
  processToCheckout(state) {
    return {
      ...state,
      cartCheckout: !state.cartCheckout
    };
  }

  deliveryTypeWasChanged(state, payload) {
    return {
      ...state,
      deliveryType: payload
    };
  }
}
