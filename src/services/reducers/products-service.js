import { isTablet, isMobile, isBrowser,  } from "react-device-detect";

export default class Products {
  static productsPerPage() {
    let temporal;
    if (isTablet) temporal = 6;
    else if (isMobile) temporal = Infinity;
    else if (isBrowser) temporal = 8;

    return {
      temporal
    };
  }

  // _productsPerPage = 8;

  productsLoaded(state, payload) {
    const newProducts = payload.slice(0, state.productsPerPage);

    return {
      ...state,
      isLoading: false,
      products: payload,
      productsBlock: newProducts
    };
  }

  paginateForward(state) {
    const products =
      (state.selectedCategories.length > 0 &&
        state.filteredProducts.length === 0) ||
      state.filteredProducts.length > 0
        ? state.filteredProducts
        : state.products;
    const availablePages = Math.ceil(products.length / state.productsPerPage);

    if (state.paginationPage + 1 > availablePages) {
      return {
        ...state
      };
    }

    const index = state.paginationPage * state.productsPerPage;
    const newProducts = products.slice(index, index + state.productsPerPage);

    return {
      ...state,
      paginationPage: state.paginationPage + 1,
      productsBlock: newProducts
    };
  }

  paginateBackward(state) {
    let newProducts;
    let paginationPage = state.paginationPage;
    const products =
      (state.selectedCategories.length > 0 &&
        state.filteredProducts.length === 0) ||
      state.filteredProducts.length > 0
        ? state.filteredProducts
        : state.products;
    const availablePages = Math.ceil(products.length / state.productsPerPage);

    if (state.paginationPage - 1 <= 1) {
      newProducts = products.slice(0, state.productsPerPage);
      paginationPage = 1;
    } else if (availablePages === state.paginationPage) {
      const index = (state.paginationPage - 2) * state.productsPerPage;
      newProducts = products.slice(index, index + state.productsPerPage);
      paginationPage -= 1;
    } else {
      const index = (state.paginationPage - 1) * state.productsPerPage;
      newProducts = products.slice(index, index + state.productsPerPage);
      paginationPage -= 1;
    }

    return {
      ...state,
      paginationPage,
      productsBlock: newProducts
    };
  }

  displayProductsAction(state) {
    // let temp = !state.displayProducts;
    return {
      ...state,
      displayProducts: !state.displayProducts
    };
  }
}
