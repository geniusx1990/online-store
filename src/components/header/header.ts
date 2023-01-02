import './header.css';
import SearchBar from '../searchBar/search';

class Header {
    private container: HTMLElement;
    search: SearchBar;

    constructor() {
        this.container = document.createElement('header');
        this.container.className = 'header header__main';
        this.search = new SearchBar();
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
        cartButton.href = '#cart-page';
        const productsNum = document.createElement('div');
        productsNum.className = 'header__products-number';
        if(localStorage.cartItems) {
            const storageProducts = JSON.parse(localStorage.cartItems); 
            productsNum.textContent = storageProducts.length.toString();
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

        const searchBar = this.search.draw();
        headerWrapper.appendChild(searchBar);

        const cartBtn = this.createCartButton();
        headerWrapper.appendChild(cartBtn);

        return this.container;
    }    
}

export default Header;