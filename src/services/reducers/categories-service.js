export default class CategoriesService {
  categoriesLoaded(state, payload) {
    return {
      ...state,
      categories: payload
    };
  }

  categoryWasSelected(state, payload) {
    const { selectedCategories, products } = state;
    const idx = selectedCategories.findIndex(item => item === payload);
    const newSelectedCategories =
      idx !== -1
        ? [
            ...state.selectedCategories.slice(0, idx),
            ...state.selectedCategories.slice(idx + 1)
          ]
        : [...selectedCategories, payload];
    const filteredProducts =
      newSelectedCategories.length === 0
        ? products
        : this._filterProductsBySelectedCategory(
            products,
            newSelectedCategories
          );

    return {
      ...state,
      selectedCategories: newSelectedCategories,
      filteredProducts: filteredProducts,
      productsBlock: filteredProducts.slice(0, state.productsPerPage),
      paginationPage: 1
    };
  }

  _filterProductsBySelectedCategory(products, selectedCategories) {
    return products.filter(product => {
      return selectedCategories.includes(product.category_id);
    });
  }
}
