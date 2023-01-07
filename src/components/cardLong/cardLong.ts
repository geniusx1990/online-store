import './cardLong.css';
import {Product} from '../../utils/types';

class CardLong {
    private container: HTMLElement;

    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'product-item';
    }

    private createProductInfo(product: Product) {
        const productInfo = document.createElement('div');
        productInfo.className = 'product-item__info';
        this.container.append(productInfo);

        const title = document.createElement('h3');
        title.className = 'product-item__title';
        title.textContent = product.title;
        productInfo.append(title);

        const mainInfo = document.createElement('div');
        mainInfo.className = 'product-item__main-info';
        productInfo.append(mainInfo);

        const brand = document.createElement('h4');
        brand.className = 'product-item__brand';
        brand.textContent = `Brand: ${product.brand}`;
        mainInfo.append(brand);

        const price = document.createElement('h4');
        price.className = 'product-item__price';
        price.textContent = `Price: $${product.price}`;
        mainInfo.append(price);

        const productDescription = document.createElement('p');
        productDescription.className = 'product-item__description';
        productDescription.textContent = product.description;
        productInfo.append(productDescription);

        const extraInfo = document.createElement('div');
        extraInfo.className = 'product-item__extra';
        productInfo.append(extraInfo);

        const category = document.createElement('h5');
        category.className = 'product-item__category';
        category.textContent = `Category: ${product.category}`;
        extraInfo.append(category);

        const rating = document.createElement('h5');
        rating.className = 'product-item__rating';
        rating.textContent = `Rating: ${product.rating}`;
        extraInfo.append(rating);

        const discount = document.createElement('h5');
        discount.className = 'product-item__discount';
        discount.textContent = `Discount: ${product.discountPercentage}%`;
        extraInfo.append(discount);

        this.container.append(productInfo);
    }

    draw(product: Product) {
        
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'product-item__image-wrapper';
        this.container.append(imageWrapper);

        const image = document.createElement('img');
        image.className = 'product-item__image';
        image.src = product.thumbnail;
        image.alt = product.title;
        imageWrapper.append(image);

        this.createProductInfo(product);

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'product-item__button-container';
        this.container.append(buttonContainer);

        const addCart = document.createElement('span');
        addCart.className = 'add-to-cart';
        buttonContainer.append(addCart);

        const inStock = document.createElement('h4');
        inStock.className = 'product-item__stock';
        inStock.textContent = `In stock: ${product.stock}`;
        buttonContainer.append(inStock);

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

export default CardLong;