"use strict";

const InvalidArticleIdException = require("./InvalidArticleIdException.js");
const InvalidQuantityException = require("./InvalidQuantityException.js");
const InvalidPriceException = require("./InvalidPriceException.js");

module.exports = class CartItem {

    //region private attributes
    #articleId;
    #name;
    #quantity;
    #price;
    //endregion private attributes

    //region public methods
    constructor(articleId, name, quantity, price) {
        if (articleId < 1) {
            throw new InvalidArticleIdException("Article id must be greater than 0");
        }
        if (quantity < 1) {
            throw new InvalidQuantityException("Quantity must be greater than 0");
        }
        if (price < 10) {
            throw new InvalidPriceException("Price must be greater than 10");
        }

        this.#articleId = articleId;
        this.#name = name;
        this.#quantity = quantity;
        this.#price = price;
    }

    get articleId() {
        return this.#articleId;
    }

    get name() {
        return this.#name;
    }

    get quantity() {
        return this.#quantity;
    }

    set quantity(value) {
        if (value < 1) {
            throw new InvalidQuantityException("Quantity must be greater than 0");
        }
        return this.#quantity = value;
    }

    get price() {
        return this.#price;
    }

    set price(value) {
        if (value < 10) {
            throw new InvalidPriceException("Price must be greater than 10");
        }
        return this.#price = value;
    }

    get total() {
        return this.#quantity * this.#price;
    }
    //endregion public methods

    //region private methods
    //endregion private methods
}



