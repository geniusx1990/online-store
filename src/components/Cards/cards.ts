import './cards.css';
import {Product} from '../../utils/types';

class Cards {
    private container: HTMLElement;
    products: Product[];

    constructor(products: Product[]) {
        this.container = document.createElement('div');
        this.container.className = 'cards_container';
        this.products = products;
    }

    private drawContent() {  
        const cardItem = document.createElement('div');
        cardItem.className = 'cards';

        for (let product of this.products) {
            const productCard = document.createElement('div');
            productCard.className = 'product_item';

            const title = document.createElement('p');
            title.className = 'product_title';

            title.textContent = product.title;
            productCard.append(title);
            cardItem.append(productCard);

            const cardImage = document.createElement('img');
            cardImage.className = 'product_image';
            cardImage.src = product.thumbnail;
            productCard.append(cardImage);

            const cardInfo = document.createElement('div');
            cardInfo.className = 'card-description';

            const branName = document.createElement('p');
            branName.className = 'brand-name';
            branName.textContent = `Brand name: ${product.brand}`;
            cardInfo.append(branName);

            const cardDescription = document.createElement('p');
            cardDescription.className = 'description';
            cardDescription.textContent = product.description;
            cardInfo.append(cardDescription);
            productCard.append(cardInfo);

            const priceContent = document.createElement('div');
            priceContent.className = 'card-price-container';

            const priceCard = document.createElement('h2');
            priceCard.className = 'price';
            priceCard.textContent = `${product.price} $`;
            priceContent.append(priceCard);

            const stockCard = document.createElement('p');
            stockCard.className = 'card-in-stock';
            stockCard.textContent = `In stock: ${product.stock}`
            priceContent.append(stockCard);

            const addCart = document.createElement('span');
            addCart.className = 'add-to-cart';
            priceContent.append(addCart);

            productCard.append(priceContent);
        }

        return cardItem;
    }

    getItemsFound() {
        return this.products.length;
    }

    drawCards() {
        const cardItem = this.drawContent();
        console.log(cardItem)
        this.container.appendChild(cardItem);

        return this.container;
    }
}

export default Cards;