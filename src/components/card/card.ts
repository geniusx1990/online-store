import './card.css';
import { Product } from '../../utils/types';

class Card {
    private container: HTMLElement;

    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'product_item';
    }

    draw(product: Product) {
        const title = document.createElement('h2');
        title.className = 'product_title';
        title.textContent = product.title;
        this.container.append(title);

        const cardImage = document.createElement('img');
        cardImage.className = 'product_image';
        cardImage.src = product.thumbnail;
        this.container.append(cardImage);

        const cardInfo = document.createElement('div');
        cardInfo.className = 'card-description';

        const category = document.createElement('h4');
        category.className = 'category';
        category.textContent = `Category: ${product.category}`;
        cardInfo.append(category);

        const branName = document.createElement('h4');
        branName.className = 'brand-name';
        branName.textContent = `Brand: ${product.brand}`;
        cardInfo.append(branName);

        const price = document.createElement('h4');
        price.className = 'price';
        price.textContent = `Price: $${product.price}`;
        cardInfo.append(price);

        const discount = document.createElement('h4');
        discount.className = 'discount';
        discount.textContent = `Discount: ${product.discountPercentage}%`;
        cardInfo.append(discount);

        const rating = document.createElement('h4');
        rating.className = 'rating';
        rating.textContent = `Rating: ${product.rating}`;
        cardInfo.append(rating);

        this.container.append(cardInfo);

        const priceContent = document.createElement('div');
        priceContent.className = 'card-price-container';
        this.container.append(priceContent);

        const stockCard = document.createElement('p');
        stockCard.className = 'card-in-stock';
        stockCard.textContent = `In stock: ${product.stock}`
        priceContent.append(stockCard);

        const addCart = document.createElement('span');
        addCart.className = 'add-to-cart';
        priceContent.append(addCart);

        this.container.addEventListener('click', (e) => {

            console.log(e.target)
            const target = <HTMLElement>e.target;
            if (target.classList.contains('add-to-cart')) {
                target.classList.toggle('added-to-cart')
                if (target.classList.contains('added-to-cart')) {
                    console.log('aaa')
                    this.addToCart(product)
                    let headerTotalSum = <HTMLDivElement>document.querySelector('.header__total-sum');
                    let finalSumLocalStorage = JSON.parse(localStorage.cartItems)
                    let sum = 0;
                    for (let i = 0; i < finalSumLocalStorage.length; i++) {
                        if (finalSumLocalStorage[i]['count'] == undefined) {
                            finalSumLocalStorage[i]['count'] = 1;
                        }
                        sum += finalSumLocalStorage[i]['count'] * finalSumLocalStorage[i]['price'];
                    }
                    headerTotalSum.textContent = `${sum} $`;
                } else if (target.classList.contains('add-to-cart')) {
                    let itemsInStorage: Product[] = JSON.parse(localStorage.cartItems);
                    localStorage.cartItems = JSON.stringify(itemsInStorage)
                    let newItemStorage = itemsInStorage.filter((item: Product) => item.id !== product.id);
                    localStorage.removeItem('cartItems')
                    localStorage.cartItems = JSON.stringify(newItemStorage);
                    let headerTotalSum = <HTMLDivElement>document.querySelector('.header__total-sum');
                    let sumCountDisplayHeader = <HTMLDivElement>document.querySelector('.header__products-number');
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
                    headerTotalSum.textContent = `${sum} $`;
                    sumCountDisplayHeader.textContent = `${sumCount}`
                }
            } else {
                window.location.href = `#product-page/${product.id}`;

            }

            /* if(target.classList.contains('add-to-cart')) {
                target.classList.toggle('added-to-cart');
                this.addToCart(product)


                let headerTotalSum = <HTMLDivElement>document.querySelector('.header__total-sum');
                let finalSumLocalStorage = JSON.parse(localStorage.cartItems)
                let sum = 0;
                for (let i = 0; i < finalSumLocalStorage.length; i++) {
                    if (finalSumLocalStorage[i]['count'] == undefined) {
                        finalSumLocalStorage[i]['count'] = 1;
                    }
                    sum += finalSumLocalStorage[i]['count'] * finalSumLocalStorage[i]['price'];
                }
                headerTotalSum.textContent = `${sum} $`;

            } else {
                window.location.href = `#product-page/${product.id}`;
            }  */
        })

        return this.container;
    }

    addToCart(product: Product) {
        const productsCounter = <HTMLDivElement>document.querySelector('.header__products-number');
        let itemsInStorage: Product[] = JSON.parse(localStorage.cartItems);
        if (itemsInStorage.some((item: Product) => item.id === product.id)) {
            return;
        } else {
            itemsInStorage.push(product);
            localStorage.cartItems = JSON.stringify(itemsInStorage);

            let test = JSON.parse(localStorage.cartItems);
            let sumOfItems = 0;
            for (let i = 0; i < test.length; i++) {
                if (test[i]['count'] == undefined) {
                    test[i]['count'] = 1;
                }
                sumOfItems += test[i]['count'];
                console.log(test[i]['count'])
            }
            productsCounter.textContent = `${sumOfItems}`;

            //productsCounter.textContent = itemsInStorage.length.toString();
        }

    }

}

export default Card;