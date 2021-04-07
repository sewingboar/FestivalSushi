export default class PlacesService {
  placesLoaded(state, payload) {
    return {
      ...state,
      mapCenter: this._calculateMapCenter(payload),
      places: payload
    };
  }

  citiesLoaded(state, payload) {
    return {
      ...state,
      cities: payload
    };
  }

  cityWasSelected(state, payload) {
    return {
      ...state,
      selectedCity: payload
    };
  }

  placeWasSelected(state, payload) {
    return {
      ...state,
      selectedPlaceId: payload
    };
  }

  _calculateMapCenter(places) {
    let lat = 0.0;
    let lon = 0.0;

    for (let place of places) {
      lat += Number(place.latitude);
      lon += Number(place.longitude);
    }
    const latitude = lat / places.length;
    const longitude = lon / places.length;

    return {
      lat: Number(latitude.toFixed(2)),
      lng: Number(longitude.toFixed(2))
    };
  }
}
