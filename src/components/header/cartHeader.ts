import './header.css';

class CartHeader {
    private container: HTMLElement;

    constructor() {
        this.container = document.createElement('header');
        this.container.className = 'header header__main';
    }

    private createLogo(logoName: string) {
        const logo = document.createElement('div');
        logo.className = ' logo header__logo';
        const logoText = document.createElement('h1');
        logoText.className = 'logo__text';
        logoText.textContent = logoName;
        logo.appendChild(logoText);
        return logo;
    }

    private createCartButton() {
        const btnWrapper = document.createElement('div');
        btnWrapper.className = 'header__button-wrapper';
        const cartButton = document.createElement('a');
        cartButton.className = 'header__button button_cart';
        const productsNum = document.createElement('div');
        productsNum.className = 'header__products-number';
        productsNum.textContent = '0';
        btnWrapper.appendChild(cartButton);
        btnWrapper.appendChild(productsNum);
        return btnWrapper;
    }

    draw() {
        const headerWrapper = document.createElement('div');
        headerWrapper.className = 'header__wrapper';
        this.container.appendChild(headerWrapper);

        const logo = this.createLogo('Online Store');
        headerWrapper.appendChild(logo);

        // const cartTotal = document.createElement('div');
        // cartTotal.className = 'header__total';

        // const totalText = document.createElement('span');
        // totalText.className = 'header__total-text';
        // totalText.textContent = 'Cart total: ';

        // const totalSum = document.createElement('span');
        // totalSum.className = 'header__total-sum';
        // totalSum.textContent = '';

        // cartTotal.appendChild(totalText);
        // cartTotal.appendChild(totalSum);
        // headerWrapper.appendChild(cartTotal);

        const cartBtn = this.createCartButton();
        headerWrapper.appendChild(cartBtn);

        return this.container;
    }    
}

export default CartHeader;