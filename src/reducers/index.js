import {
  CartService,
  ProductsService,
  CategoriesService,
  CheckoutService,
  PlacesService,
  CartDopService
} from "../services/reducers";

const initialState = {
  productsPerPage: ProductsService.productsPerPage().temporal,
  products: [],
  displayProducts: true,
  isLoading: true,
  cartItems: CartService.getDataFromLocalStorage("cartItems"),
  totalPrice: CartService.calculateCartTotalByLocalStorage(),
  cartCheckout: false,
  cartDop: false,
  categories: [],
  selectedCategories: [],
  filteredProducts: [],
  productsBlock: [],
  paginationPage: 1,
  selectedCity: 1,
  places: [],
  cities: [],
  mapCenter: null,
  selectedPlaceId: null,
  requiredContainers: CartService.getDataFromLocalStorage("requiredContainers"),
  requiredHotContainers: CartService.getDataFromLocalStorage("requiredHotContainers"),
  deliveryType: 0,
  form: {
    name: "",
    phone: "",
    email: "",
    address: ""
  }
};

const reducerServices = {
  cart: new CartService(),
  products: new ProductsService(),
  categories: new CategoriesService(),
  checkout: new CheckoutService(),
  cartdop: new CartDopService(),
  places: new PlacesService()
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "DISPLAY_PRODUCTS":
      return reducerServices.products.displayProductsAction(state);

    case "PRODUCTS_PER_PAGE":
      return reducerServices.products.productsPerPage(state);

    case "PRODUCT_ADD_TO_CART":
      return reducerServices.cart.productAddedToCart(state, payload);

    case "PRODUCT_DELETE_FROM_CART":
      return reducerServices.cart.productDeletedFromCart(state, payload);

    case "PRODUCTS_LOADED":
      return reducerServices.products.productsLoaded(state, payload);

    case "CATEGORIES_LOADED":
      return reducerServices.categories.categoriesLoaded(state, payload);

    case "CATEGORY_WAS_SELECTED":
      return reducerServices.categories.categoryWasSelected(state, payload);

    case "PROCESS_TO_CHECKOUT":
      return reducerServices.checkout.processToCheckout(state);

    case "PROCESS_TO_DOP":
      return reducerServices.cartdop.processToDop(state);

    case "PROCESS_TO_MAIN":
      return reducerServices.cartdop.processToMain(state);

    case "CHECKOUT_DELIVERY_TYPE_WAS_CHANGED":
      return reducerServices.checkout.deliveryTypeWasChanged(state, payload);

    case "PRODUCT_PAGINATION_FORWARD":
      return reducerServices.products.paginateForward(state);

    case "PRODUCT_PAGINATION_BACKWARD":
      return reducerServices.products.paginateBackward(state);

    case "PLACES_LOADED":
      return reducerServices.places.placesLoaded(state, payload);

    case "CITIES_LOADED":
      return reducerServices.places.citiesLoaded(state, payload);

    case "CITY_WAS_SELECTED":
      return reducerServices.places.cityWasSelected(state, payload);

    case "PLACE_WAS_SELECTED":
      return reducerServices.places.placeWasSelected(state, payload);

    default:
      return state;
  }
};

export default reducer;
