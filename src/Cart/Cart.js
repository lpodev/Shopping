"use strict";

const EmptyCartException = require("./EmptyCartException.js");
const UpdateCartException = require("./UpdateCartException.js");
const MultipleCurrenciesException = require("./MultipleCurrenciesException.js");

module.exports = class Cart {
  //region private attributes
  #items = [];
  #currency;
  //endregion private attributes

  //region public methods
  constructor(items = [], currency = "CHF") {
    this.#currency = currency;
    this.add(items);
  }

  get currency() {
    return this.#currency;
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
    if (items === null) {
        throw new UpdateCartException();
    }
    if (items.length != 0) {
      if (this.#items.length === 0) {
        this.#currency = items[0].currency;
      }
      for (let item of items) {
        if (item.currency !== this.#currency) {
          throw new MultipleCurrenciesException();
        }
      }
    }
    this.#items = items;
  }
  //endregion private methods
};
