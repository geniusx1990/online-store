import { Product } from "../../utils/types";
import './cartProduct.css';

class CartProduct {
    private container: HTMLElement;
    product: Product;

    constructor(product: Product) {
        this.container = document.createElement('div');
        this.container.className = 'product-card';
        this.product = product;
    }

    private createProductInfo() {
        const productInfo = document.createElement('div');
        productInfo.className = 'product-card__info';
        this.container.append(productInfo);

        const title = document.createElement('h3');
        title.className = 'product-card__title';
        title.textContent = this.product.title;
        productInfo.append(title);

        const productDescription = document.createElement('p');
        productDescription.className = 'product-card__description';
        productDescription.textContent = this.product.description;
        productInfo.append(productDescription);

        const extraInfo = document.createElement('div');
        extraInfo.className = 'product-card__extra';
        productInfo.append(extraInfo);

        const rating = document.createElement('div');
        rating.className = 'product-card__rating';
        rating.textContent = `Rating: ${this.product.rating}`;
        extraInfo.append(rating);

        const discount = document.createElement('div');
        discount.className = 'product-card__discount';
        discount.textContent = `Discount: ${this.product.discountPercentage}%`;
        extraInfo.append(discount);

        return productInfo;
    }

    private createPriceBlock() {
        const priceBlock = document.createElement('div');
        priceBlock.className = 'product-card__price-block';

        const stockNumber = document.createElement('p');
        stockNumber.className = 'product-card__stock';
        stockNumber.textContent = `Stock: ${this.product.stock}`;
        priceBlock.append(stockNumber);

        const counter = document.createElement('div');
        counter.className = 'product-card__counter';
        priceBlock.append(counter);

        const leftButton = document.createElement('button');
        leftButton.className = 'product-card__button button_left';
        counter.append(leftButton);

        const productsNumber = document.createElement('span');
        productsNumber.className = 'product-card__products-number';
        productsNumber.textContent = '1';
        counter.append(productsNumber);

        const rightButton = document.createElement('button');
        rightButton.className = 'product-card__button button_right';
        counter.append(rightButton);

        const price = document.createElement('p');
        price.className = 'product-card__price';
        price.textContent = `Price: $${this.product.price}`;
        priceBlock.append(price);

        return priceBlock;
    }

    draw() {
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'product-card__image-wrapper';
        this.container.append(imageWrapper);

        const image = document.createElement('img');
        image.className = 'product-card__image';
        image.src = this.product.thumbnail;
        image.alt = this.product.title;
        imageWrapper.append(image);

        const basicInfo = this.createProductInfo();
        this.container.append(basicInfo);

        const priceBlock = this.createPriceBlock();
        this.container.append(priceBlock);

        return this.container;
    }
}

export default CartProduct;