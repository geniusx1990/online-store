import './cards.css';
import products from "../../utils/products";
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

        for (const key in products.products) {
            const prodcutCard = document.createElement('div');
            prodcutCard.className = 'product_item';

            const title = document.createElement('p');
            title.className = 'product_title';

            title.textContent = products.products[key].title;
            prodcutCard.appendChild(title);
            cardItem.appendChild(prodcutCard);

            const cardImage = document.createElement('img');
            cardImage.className = 'product_image';
            cardImage.src = products.products[key].thumbnail;
            prodcutCard.appendChild(cardImage);

            const cardInfo = document.createElement('div');
            cardInfo.className = 'card-description';

            const branName = document.createElement('p');
            branName.className = 'brand-name';
            branName.textContent = `Brand name: ${products.products[key].brand}`;
            cardInfo.appendChild(branName);

            const cardDescription = document.createElement('p');
            cardDescription.className = 'description';
            cardDescription.textContent = products.products[key].description;
            cardInfo.appendChild(cardDescription);
            prodcutCard.appendChild(cardInfo);

            const priceContent = document.createElement('div');
            priceContent.className = 'card-price-container';

            const priceCard = document.createElement('h2');
            priceCard.className = 'price';
            priceCard.textContent = `${products.products[key].price} $`;
            priceContent.appendChild(priceCard);

            const stockCard = document.createElement('p');
            stockCard.className = 'card-in-stock';
            stockCard.textContent = `In stock: ${products.products[key].stock}`
            priceContent.appendChild(stockCard);

            const addCart = document.createElement('span');
            addCart.className = 'add-to-cart';
            priceContent.appendChild(addCart);

            prodcutCard.appendChild(priceContent);
        }
        return cardItem;
    }

    drawCards() {
        const cardItem = this.drawContent();
        this.container.appendChild(cardItem);

        return this.container;
    }
}

export default Cards;