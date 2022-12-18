import './header.css';

class Header {

    drawHeader() {
   
        const header = document.createElement('header');
        header.className = 'header header__main';

        const headerWrapper = document.createElement('div');
        headerWrapper.className = 'header__wrapper';
        header.appendChild(headerWrapper);

        const logo = document.createElement('div');
        logo.className = ' logo header__logo';

        const logoText = document.createElement('h1');
        logoText.className = 'logo__text';
        logoText.textContent = 'Online Store';

        logo.appendChild(logoText);
        headerWrapper.appendChild(logo);

        const cartTotal = document.createElement('div');
        cartTotal.className = 'header__total';

        const totalText = document.createElement('span');
        totalText.className = 'header__total-text';
        totalText.textContent = 'Cart total: ';

        const totalSum = document.createElement('span');
        totalSum.className = 'header__total-sum';
        totalSum.textContent = '';

        cartTotal.appendChild(totalText);
        cartTotal.appendChild(totalSum);
        headerWrapper.appendChild(cartTotal);

        const cartButton = document.createElement('a');
        cartButton.className = 'header__button button_cart';
        headerWrapper.appendChild(cartButton);

        document.body.prepend(header);

    }
    
}

export default Header;