import { Product } from '../../utils/types';
import './header.css';

class Header {
    private container: HTMLElement;

    constructor() {
        this.container = document.createElement('header');
        this.container.className = 'header header__main';
    }

    private createLogo(logoName: string) {
        const logo = document.createElement('div');
        logo.className = ' logo header__logo';
        const logoText = document.createElement('h1');
        const logoLink = document.createElement('a');
        logoLink.className = 'logo__link';
        logoText.className = 'logo__text';
        logoText.textContent = logoName;
        logoLink.href = '#main-page';
        logoLink.append(logoText);
        logo.appendChild(logoLink);
        return logo;
    }

    private createCartButton() {
        const btnWrapper = document.createElement('div');
        btnWrapper.className = 'header__button-wrapper';
        const cartButton = document.createElement('a');
        cartButton.className = 'header__button button_cart';
        cartButton.href = '#cart-page';
        const productsNum = document.createElement('div');
        productsNum.className = 'header__products-number';
        if (localStorage.cartItems) {
            const storageProducts: Product[] = JSON.parse(localStorage.cartItems);
            let test = JSON.parse(localStorage.cartItems);
            let sumOfItems = 0;
            for (let i = 0; i < test.length; i++) {
                if (test[i]['count'] == undefined) {
                    test[i]['count'] = 1;
                }
                sumOfItems += test[i]['count'];
                console.log(test[i]['count'])
            }
            productsNum.textContent = `${sumOfItems}`;
            console.log(productsNum.textContent);
        } else {
            productsNum.textContent = '0';
        }

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

export default Header;