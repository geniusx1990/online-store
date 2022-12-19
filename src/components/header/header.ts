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

    private createLogo() {
        const logo = document.createElement('div');
        logo.className = ' logo header__logo';
        const logoText = document.createElement('h1');
        logoText.className = 'logo__text';
        logoText.textContent = 'Online Store';
        logo.appendChild(logoText);
        return logo;
    }

    private createCartButton() {
        const cartButton = document.createElement('a');
        cartButton.className = 'header__button button_cart';
        return cartButton;
    }

    draw() {

        const headerWrapper = document.createElement('div');
        headerWrapper.className = 'header__wrapper';
        this.container.appendChild(headerWrapper);

        const logo = this.createLogo();
        headerWrapper.appendChild(logo);

        const searchBar = this.search.draw();
        headerWrapper.appendChild(searchBar);

        const cartBtn = this.createCartButton();
        headerWrapper.appendChild(cartBtn);

        return this.container;

    }
    
}

export default Header;


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