export default class CartDopService {
  processToDop(state) {
    return {
      ...state,
      cartDop: !state.cartDop
    };
  }
}
