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
        stockNumber.textContent = ` ${this.product.stock - 1}`;
        stockBlock.append(stockNumber);

        const counter = document.createElement('div');
        counter.className = 'product-card__counter';
        priceBlock.append(counter);

        const leftButton = document.createElement('button');
        leftButton.className = 'product-card__button button_minus';
        counter.append(leftButton);


        let count: number;

        leftButton.addEventListener('click', (e) => {
            count = Number(productsNumber.textContent);
            let finalSum = <HTMLDivElement>document.querySelector('.summary__total-number')
            let sumCountDisplay = <HTMLDivElement>document.querySelector('.summary__products-number')
            let sumCountDisplayHeader = <HTMLDivElement>document.querySelector('.header__products-number')

            e.preventDefault();

            count = count - 1;
            let test = JSON.parse(localStorage.cartItems);
            for (let i = 0; i < test.length; i++) {
                if (test[i].id == this.product.id) {
                    JSON.stringify(test[i]['count'] = count);
                }
                localStorage.cartItems = JSON.stringify(test);
            }
            let countNumberDisplay = JSON.parse(localStorage.cartItems);
            productsNumber.textContent = countNumberDisplay.filter((item: Product) => item.id === this.product.id)[0].count;

            if (productsNumber.textContent == '0') {
                this.container.remove();
                let itemsInStorage: Product[] = JSON.parse(localStorage.cartItems);
                localStorage.cartItems = JSON.stringify(itemsInStorage)
                let newItemStorage = itemsInStorage.filter((item: Product) => item.id !== this.product.id);
                localStorage.removeItem('cartItems')
                localStorage.cartItems = JSON.stringify(newItemStorage);
            }

            let finalSumLocalStorage = JSON.parse(localStorage.cartItems)
            let sum = 0;
            let sumCount = 0;
            for (let i = 0; i < finalSumLocalStorage.length; i++) {
                if (finalSumLocalStorage[i]['count'] == undefined) {
                    finalSumLocalStorage[i]['count'] = 1;
                }
                sum += finalSumLocalStorage[i]['count'] * finalSumLocalStorage[i]['price'];
                sumCount += finalSumLocalStorage[i]['count'];

            }
            finalSum.textContent = `$ ${sum}`;
            sumCountDisplay.textContent = `${sumCount}`
            sumCountDisplayHeader.textContent = `${sumCount}`;
            priceSum.textContent = (countNumberDisplay.filter((item: Product) => item.id === this.product.id)[0].count * countNumberDisplay.filter((item: Product) => item.id === this.product.id)[0].price).toString();

            stockNumber.textContent = (Number(stockNumber.textContent) + 1).toString();

        })

        const productsNumber = document.createElement('span');
        productsNumber.className = 'product-card__products-number';

        let countNumberDisplay = JSON.parse(localStorage.cartItems);
        if (countNumberDisplay.filter((item: Product) => item.id === this.product.id)[0].count == null) {
            productsNumber.textContent = '1';

        } else {
            productsNumber.textContent = countNumberDisplay.filter((item: Product) => item.id === this.product.id)[0].count;

        }
        counter.append(productsNumber);

        const rightButton = document.createElement('button');
        rightButton.className = 'product-card__button button_plus';
        counter.append(rightButton);

        rightButton.addEventListener('click', (e) => {

            e.preventDefault();
            count = Number(productsNumber.textContent);
            let finalSum = <HTMLDivElement>document.querySelector('.summary__total-number')
            let sumCountDisplay = <HTMLDivElement>document.querySelector('.summary__products-number')
            let sumCountDisplayHeader = <HTMLDivElement>document.querySelector('.header__products-number')

            count = count + 1;
            let test = JSON.parse(localStorage.cartItems);
            for (let i = 0; i < test.length; i++) {
                if (test[i].id == this.product.id) {
                    JSON.stringify(test[i]['count'] = count);
                }
                localStorage.cartItems = JSON.stringify(test);
            }

            let finalSumLocalStorage = JSON.parse(localStorage.cartItems)
            let sum = 0;
            let sumCount = 0;
            for (let i = 0; i < finalSumLocalStorage.length; i++) {
                if (finalSumLocalStorage[i]['count'] == undefined) {
                    finalSumLocalStorage[i]['count'] = 1;
                }
                sum += finalSumLocalStorage[i]['count'] * finalSumLocalStorage[i]['price'];
                sumCount += finalSumLocalStorage[i]['count'];


            }
            finalSum.textContent = `$ ${sum}`;
            sumCountDisplay.textContent = `${sumCount}`
            sumCountDisplayHeader.textContent = `${sumCount}`;


            let countNumberDisplay = JSON.parse(localStorage.cartItems)
            productsNumber.textContent = countNumberDisplay.filter((item: Product) => item.id === this.product.id)[0].count /* countNumberDisplay.filter((item: Product) => item.id === this.product.id)[count] */ // (Number(productsNumber.textContent) + 1).toString();
            priceSum.textContent = (countNumberDisplay.filter((item: Product) => item.id === this.product.id)[0].count * countNumberDisplay.filter((item: Product) => item.id === this.product.id)[0].price).toString();
            stockNumber.textContent = (Number(stockNumber.textContent) - 1).toString();

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
        if (countNumberDisplay.filter((item: Product) => item.id === this.product.id)[0].count == null) {
            countNumberDisplay.filter((item: Product) => item.id === this.product.id)[0].count = 1;
            priceSum.textContent = (countNumberDisplay.filter((item: Product) => item.id === this.product.id)[0].count * countNumberDisplay.filter((item: Product) => item.id === this.product.id)[0].price).toString();

        } else {
            priceSum.textContent = (countNumberDisplay.filter((item: Product) => item.id === this.product.id)[0].count * countNumberDisplay.filter((item: Product) => item.id === this.product.id)[0].price).toString();
        }

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

        this.container.addEventListener('click', (e) => {
            const target = <HTMLElement>e.target;
            if (target.classList.contains('product-card__button')) {
                return;
            } else {
                window.location.href = `#product-page/${this.product.id}`;
            }
        })

        return this.container;
    }
}

export default CartProduct;