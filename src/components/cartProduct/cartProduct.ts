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

        const stockBlock = document.createElement('div');
        stockBlock.className = 'product-card__stock';
        priceBlock.append(stockBlock);

        const stockTitle = document.createElement('span');
        stockTitle.className = 'product-card__stock-title';
        stockTitle.textContent = `Stock: `;
        stockBlock.append(stockTitle);

        const stockNumber = document.createElement('span');
        stockNumber.className = 'product-card__stock-number';
        stockNumber.textContent = ` ${this.product.stock}`;
        stockBlock.append(stockNumber);
       
        const counter = document.createElement('div');
        counter.className = 'product-card__counter';
        priceBlock.append(counter);

        const leftButton = document.createElement('button');
        leftButton.className = 'product-card__button button_minus';
        counter.append(leftButton);

        const totalSum = document.querySelector('.summary__total-number');
        console.log(totalSum)

        leftButton.addEventListener('click', (e) => {
            e.preventDefault();
            productsNumber.textContent = (Number(productsNumber.textContent) - 1).toString();
            // if(productsNumber.textContent == '1') {
            //     leftButton.disabled = true;
            // } else {
            //     leftButton.disabled = false;
            // }
            priceSum.textContent = (Number(priceSum.textContent) - this.product.price).toString();
            stockNumber.textContent = (Number(stockNumber.textContent) + 1).toString();
            // if(stockNumber.textContent == `${this.product.stock}`) {
            //     leftButton.disabled = true;
            // } else {
            //     leftButton.disabled = false;
            // }
        })

        const productsNumber = document.createElement('span');
        productsNumber.className = 'product-card__products-number';
        productsNumber.textContent = '1';
        counter.append(productsNumber);

        const rightButton = document.createElement('button');
        rightButton.className = 'product-card__button button_plus';
        counter.append(rightButton);

        rightButton.addEventListener('click', (e) => {
            e.preventDefault();
            productsNumber.textContent = (Number(productsNumber.textContent) + 1).toString();
            priceSum.textContent = (Number(priceSum.textContent) + this.product.price).toString();
            stockNumber.textContent = (Number(stockNumber.textContent) - 1).toString();
            // if(stockNumber.textContent == '0') {
            //     rightButton.disabled = true;
            // } else {
            //     rightButton.disabled = false;
            // }
        })

        const price = document.createElement('div');
        price.className = 'product-card__price';
        priceBlock.append(price);

        const priceTitle = document.createElement('span');
        priceTitle.className = 'product-card__price-title';
        price.textContent = `Price: $`;
        price.append(priceTitle);

        const priceSum = document.createElement('span');
        priceSum.className = `product-card__price-sum`;
        priceSum.textContent = `${this.product.price}`;
        price.append(priceSum);

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

        this.container.addEventListener('click', () => {
            window.location.href = `#product-page/${this.product.id}`;
        })

        return this.container;
    }
}

export default CartProduct;