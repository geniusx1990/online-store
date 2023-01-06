import './card.css';
import {Product} from '../../utils/types';

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
            if(target.classList.contains('add-to-cart')) {
                target.classList.add('added-to-cart');
                this.addToCart(product)
            } else {
                window.location.href = `#product-page/${product.id}`;
            } 
        })

        return this.container;
    }

    addToCart(product: Product) {
        const productsCounter = <HTMLDivElement>document.querySelector('.header__products-number');
        let itemsInStorage: Product[] = JSON.parse(localStorage.cartItems);
        if(itemsInStorage.some((item: Product) => item.id === product.id)) {
            return;
        } else {
            itemsInStorage.push(product);
            localStorage.cartItems = JSON.stringify(itemsInStorage);
            productsCounter.textContent = itemsInStorage.length.toString();
        }  
    }

}

export default Card;