import Products from "../mock/products";
import Categories from "../mock/categories";
import Cities from "../mock/cities";
import Places from "../mock/places";

export default class SushiStoreService {
  _apiBase = "http://festivalsushi.com.ua:8000/api";
  _imageBaseLink = "http://festivalsushi.com.ua:8000/storage/";

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`, { mode: "cors" });

    if (!res.ok) {
      throw new Error(`Could not fetch /product, received ${res.status}`);
    }

    return await res.json();
  }

  getImage(path) {
    if (process.env.REACT_APP_MODE === "production") {
      return this._imageBaseLink + path;
    }

    return path;
  }

  getProductsBlock() {
    if (process.env.REACT_APP_MODE === "production") {
      return this.getResource("/product");
    }

    return new Promise(resolve => {
      resolve(Products);
    });
  }

  getProductCategories() {
    if (process.env.REACT_APP_MODE === "production") {
      return this.getResource("/category");
    }

    return new Promise(resolve => {
      resolve(Categories);
    });
  }

  getPlaceByCityId(cityId) {
    if (process.env.REACT_APP_MODE === "production") {
      return this.getResource(`/place/by-city/${cityId}`);
    }

    return new Promise(resolve => {
      resolve(Places.filter(place => place.city_id === cityId));
    });
  }

  getCities() {
    if (process.env.REACT_APP_MODE === "production") {
      return this.getResource("/city");
    }

    return new Promise(resolve => {
      resolve(Cities);
    });
  }

  async sendCheckoutData(data) {
    return await fetch(this._apiBase + "/order", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => response.json());
  }
}
