export default class CartService {
  processToMain(state) {
    return {
      ...state,
      cartMain: !state.cartMain
    };
  }

  updateContainers(state, productsId, quality) {
    //Задаем значения с которыми будем работать
    const { requiredContainers, requiredHotContainers, products } = state;
    let tempStorage = localStorage.getItem("cartItems"); // достаем корзину из стоража
    tempStorage = JSON.parse(tempStorage);
    const toDelete = new Set([68, 69]); //айдишники контейнеров
    const containers = products.filter(obj => toDelete.has(obj.id)); //массив с контейнерами
    const containerItem = containers.find(({ id }) => id === 68); //обычный контейнер
    const hotContainerItem = containers.find(({ id }) => id === 69); //горячий контейнер
    const addedProduct = products.find(({ id }) => id === productsId); //продукт с которым происходит оперция

    //Записываем в стейт raw значение контейнеров
    const tempRequiredContainers =
      Number(requiredContainers) + (addedProduct.reqCont * quality) / 10;
    const tempRequiredHotContainers =
      Number(requiredHotContainers) + (addedProduct.reqHot * quality) / 10;
    //действительно необходимое колличество контейнеров
    const tempReqHot = Math.ceil(tempRequiredHotContainers);
    const tempReqCont = Math.ceil(tempRequiredContainers);

    //Формируем обьекты контейнеров для добавления
    const container = {
      id: containerItem.id,
      name: containerItem.name,
      price: containerItem.price,
      weight: containerItem.weight,
      amount: tempReqCont, //нужное колличество контейнеров
      defaultAmount: containerItem.amount
    };

    const hotContainer = {
      id: hotContainerItem.id,
      name: hotContainerItem.name,
      price: hotContainerItem.price,
      weight: hotContainerItem.weight,
      amount: tempReqHot, //нужное колличество контейнеров
      defaultAmount: hotContainerItem.amount
    };

    //Удаляем все контейнеры из корзины
    tempStorage = tempStorage.filter(obj => !toDelete.has(obj.id));
    //Добавляем нужно колличество контейнеров в корзину
    tempStorage.push(container);
    tempStorage.push(hotContainer);
    //Засовываем корзину обратно в стораж
    localStorage.setItem("requiredContainers", JSON.stringify(tempRequiredContainers));
    localStorage.setItem("requiredHotContainers", JSON.stringify(tempRequiredHotContainers));
    localStorage.setItem("cartItems", JSON.stringify(tempStorage));

    return {
      ...state,
      cartItems: tempStorage, //Засовываем корзину обратно в стейт
      requiredContainers: tempRequiredContainers,
      requiredHotContainers: tempRequiredHotContainers,
      totalPrice: CartService.calculateCartTotal(tempStorage)
    };
  }

  productAddedToCart(state, productsId) {
    this._updateCartItems(state, productsId, 1);
    return this.updateContainers(state, productsId, 1);
  }

  productDeletedFromCart(state, productsId) {
    this._updateCartItems(state, productsId, -1);
    return this.updateContainers(state, productsId, -1);
  }

  static getDataFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  static calculateCartTotalByLocalStorage() {
    return CartService.calculateCartTotal(
      CartService.getDataFromLocalStorage("cartItems")
    );
  }

  static calculateCartTotal(cartItems) {
    if (!cartItems) return 0;

    let totalPrice = 0;
    for (let item of cartItems) {
      totalPrice += item.amount * item.price;
    }
    return totalPrice;
  }

  _updateCartItems(state, productsId, quality) {
    const { products, cartItems } = state;
    const deletedProduct = products.find(({ id }) => id === productsId);
    const deletedItemIndex = cartItems.findIndex(({ id }) => id === productsId);
    const deletedItem = cartItems[deletedItemIndex];
    const deletedNewItem = CartService._updateCartItem(
      deletedProduct,
      deletedItem,
      quality
    );
    const cartItemsAfterDelete = CartService._updateCartItems(
      cartItems,
      deletedNewItem,
      deletedItemIndex
    );

    localStorage.setItem("cartItems", JSON.stringify(cartItemsAfterDelete));
    return {
      ...state,
      cartItems: cartItemsAfterDelete,
      totalPrice: CartService.calculateCartTotal(cartItemsAfterDelete)
    };
  }

  static _updateCartItems(cartItems, item, idx) {
    if (item.amount === 0) {
      return [...cartItems.slice(0, idx), ...cartItems.slice(idx + 1)];
    } else if (idx < 0) {
      return [...cartItems, item];
    } else {
      return [...cartItems.slice(0, idx), item, ...cartItems.slice(idx + 1)];
    }
  }

  static _updateCartItem(product, item = {}, quality) {
    const {
      id = product.id,
      name = product.name,
      price = product.price,
      weight = product.weight,
      amount = 0,
      defaultAmount = product.amount
    } = item;

    return {
      id: id,
      name: name,
      price: price,
      weight: weight,
      amount: amount + quality,
      defaultAmount: defaultAmount
    };
  }
}
