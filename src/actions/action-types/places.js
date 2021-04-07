const placesLoaded = (newPlaces) => {
    return {
        type: 'PLACES_LOADED',
        payload: newPlaces
    }
};

const citiesLoaded = (newCities) => {
    return {
        type: 'CITIES_LOADED',
        payload: newCities
    }
};

const cityWasSelected = (cityId) => {
    return {
        type: 'CITY_WAS_SELECTED',
        payload: cityId
    }
};

const placeWasSelected = (placeId) => {
    return {
        type: 'PLACE_WAS_SELECTED',
        payload: placeId
    }
};

export {
    placesLoaded,
    citiesLoaded,
    cityWasSelected,
    placeWasSelected
}