"use strict";

const EmptyCartException = require("./EmptyCartException.js");
const UpdateCartException = require("./UpdateCartException.js");

module.exports = class Cart {
  //region private attributes
  #items = [];
  //endregion private attributes

  //region public methods
  constructor(items) {
    this.add(items);
  }

  get items() {
    if (this.#items === null) {
      throw new EmptyCartException();
    }
    return this.#items;
  }

  get total() {
    if (this.#items === null) {
      throw new EmptyCartException();
    }
    let totalPrice = 0;
    for (let item of this.#items) {
      totalPrice += item.quantity * item.price;
    }
    return totalPrice;
  }
  //endregion public methods

  //region private methods
  count(distinct = false) {
    if (this.#items === null) {
      throw new EmptyCartException();
    } else if (distinct) {
      return this.#items.length;
    }
    let countItems = 0;
    for (let item of this.#items) {
      countItems += item.quantity;
    }
    return countItems;
  }

  add(items) {
    if (this.#items === null && items === null) {
        throw new UpdateCartException();
    }
    this.#items = items;
  }
  //endregion private methods
};
