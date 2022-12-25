import Page from "../../components/templates/page";
import CartHeader from '../../components/header/cartHeader';
import CartProduct from '../../components/cartProduct/cartProduct';
import products from '../../utils/products';
import {Product} from '../../utils/types';
import './cart.css';

class CartPage extends Page {
    header: CartHeader;
    product: CartProduct;
  
    constructor(pageName: string) {
        super(pageName);
        this.header = new CartHeader();
        this.product = new CartProduct(products.products[1])
    }

    private createProductsCounter() {
        const productsPanel = document.createElement('div');
        productsPanel.className = 'main__products-panel products-panel';

        const title = document.createElement('h2');
        title.className = 'products-panel__title';
        title.textContent = 'Products In Cart';
        productsPanel.append(title);

        const counters = document.createElement('div');
        counters.className = 'products-panel__counters';
        productsPanel.append(counters);

        const itemsWrapper = document.createElement('div');
        itemsWrapper.className = 'items-wrapper';
        counters.append(itemsWrapper);

        const itemsLabel = document.createElement('label');
        itemsLabel.className = 'items__label';
        itemsLabel.htmlFor = 'items';
        itemsLabel.textContent = 'items: ';
        itemsWrapper.append(itemsLabel);

        const itemsCounter = document.createElement('input');
        itemsCounter.type = 'number';
        itemsCounter.id = 'items';
        itemsCounter.min = '3';
        itemsCounter.max = '10';
        itemsWrapper.append(itemsCounter);

        const pages = document.createElement('div');
        pages.className = 'products-panel__pages pages';
        counters.append(pages);

        const pagesTitle = document.createElement('span');
        pagesTitle.className = 'pages__title';
        pagesTitle.textContent = 'page: ';
        pages.append(pagesTitle);

        const leftButton = document.createElement('button');
        leftButton.className = 'pages__button button_left';
        pages.append(leftButton);

        const pagesNumber = document.createElement('span');
        pagesNumber.className = 'pages__number';
        pagesNumber.textContent = '1';
        pages.append(pagesNumber);

        const rightButton = document.createElement('button');
        rightButton.className = 'pages__button button_right';
        pages.append(rightButton);

        return productsPanel;
    }

    private createSummary() {
        const summary = document.createElement('div');
        summary.className = 'summary';

        const title = document.createElement('h3');
        title.className = 'summary__title';
        title.textContent = 'Summary';
        summary.append(title);

        const productsCounter = document.createElement('div');
        productsCounter.className = 'summary__products';
        summary.append(productsCounter);

        const productsTitle = document.createElement('h4');
        productsTitle.className = 'summary__products-title';
        productsTitle.textContent = 'Products: ';
        productsCounter.append(productsTitle);

        const productsNumber = document.createElement('span');
        productsNumber.className = 'summary__products-number';
        productsNumber.textContent = '0';
        productsCounter.append(productsNumber);

        const total = document.createElement('div');
        total.className = 'summary__total';
        summary.append(total);

        const totalTitle = document.createElement('h4');
        totalTitle.className = 'summary__total-title';
        totalTitle.textContent = 'Total: ';
        total.append(totalTitle);

        const totalNumber = document.createElement('span');
        totalNumber.className = 'summary__total-number';
        totalNumber.textContent = '0';
        total.append(totalNumber);

        const promo = document.createElement('div');
        promo.className = 'summary__promo';
        summary.append(promo);

        const promoInput = document.createElement('input');
        promoInput.type = 'text';
        promoInput.className = 'summary__promo-input';
        promoInput.placeholder = 'Enter promo code';
        promo.append(promoInput);

        const promoText = document.createElement('p');
        promoText.className = 'summary__promo-text';
        promoText.textContent = 'Test promo codes: EX22, SV22';
        promo.append(promoText);

        const buyButton = document.createElement('button');
        buyButton.className = 'summary__button';
        buyButton.textContent = 'BUY NOW';
        summary.append(buyButton);

        return summary;
    }

    draw() {
        const cartHeader = this.header.draw();
        this.container.append(cartHeader);
        
        const main = document.createElement('main');
        main.className = 'main';
        this.container.append(main);

        const products = document.createElement('div');
        products.className = 'main__products';
        main.append(products);

        const productsPanel = this.createProductsCounter();
        products.append(productsPanel);

        const productCard = this.product.draw();
        products.append(productCard);

        const summary = document.createElement('div');
        summary.className = 'main__summary';
        main.append(summary);

        const summaryBlock = this.createSummary();
        summary.append(summaryBlock);

        return this.container;

    } 
}

export default CartPage;