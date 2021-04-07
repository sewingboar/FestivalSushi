const productsLoaded = (newProducts) => {
    return {
        type: 'PRODUCTS_LOADED',
        payload: newProducts
    }
};

const productAddedToCart = (productId) => {
    return {
        type: 'PRODUCT_ADD_TO_CART',
        payload: productId
    }
};


const productDeletedFromCart = (productId) => {
    return {
        type: 'PRODUCT_DELETE_FROM_CART',
        payload: productId
    }
};

const productPaginationForward = () => {
    return {
        type: 'PRODUCT_PAGINATION_FORWARD'
    }
};

const productPaginationBackward = () => {
    return {
        type: 'PRODUCT_PAGINATION_BACKWARD'
    }
};

const productsPerPage = () => {
    return {
        type: 'PRODUCTS_PER_PAGE'
    }
};

const displayProductsAction = () => {
    return {
        type: 'DISPLAY_PRODUCTS'
    }
};



export {
    productsLoaded,
    displayProductsAction,
    productsPerPage,
    productAddedToCart,
    productDeletedFromCart,
    productPaginationForward,
    productPaginationBackward
}