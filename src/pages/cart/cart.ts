import Page from "../../components/templates/page";
import CartHeader from '../../components/header/cartHeader';
import './cart.css';

class CartPage extends Page {
    header: CartHeader;
  
    constructor(pageName: string) {
        super(pageName);
        this.header = new CartHeader();
    }

    private createProductsCounter() {
        const productsPanel = document.createElement('div');
        productsPanel.className = 'main__products-panel products-panel';

        const title = document.createElement('h3');
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

        const summary = document.createElement('div');
        summary.className = 'main__summary';
        main.append(summary);

        return this.container;

    } 
}

export default CartPage;