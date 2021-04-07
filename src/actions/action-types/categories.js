const categoriesLoaded = (categories) => {
    return {
        type: 'CATEGORIES_LOADED',
        payload: categories
    }
};

const categoryWasSelected = (categoryId) => {
    return {
        type: 'CATEGORY_WAS_SELECTED',
        payload: categoryId
    }
};

export {
    categoriesLoaded,
    categoryWasSelected
}