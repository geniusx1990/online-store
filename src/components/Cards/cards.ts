import './cards.css';
import products from "../../utils/products";

class Cards {

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

            const cardDescription = document.createElement('span');
            cardDescription.className = 'description';

            const branName = document.createElement('span');
            branName.className = 'brand-name';
            branName.textContent = `Brand name: ${products.products[key].brand}`;
            prodcutCard.appendChild(branName);

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
        const content = document.querySelector('.content');

        const cardsContainer = document.createElement('div');
        cardsContainer.className = 'cards_container';

        const cardItem = this.drawContent();
        cardsContainer.appendChild(cardItem);
        content?.appendChild(cardsContainer);
    }



}

export default Cards;