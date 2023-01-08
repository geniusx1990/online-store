import Page from "../../components/templates/page";
import Header from '../../components/header/header';
import CartProduct from '../../components/cartProduct/cartProduct';
import {Product} from '../../utils/types';
import './cart.css';

class CartPage extends Page {
    header: Header;
    summary: HTMLDivElement;
    products: HTMLDivElement;
    pageLength: number;
    pageNumber: number;
    cards: any;
    maxPage: number;
  
    constructor(pageName: string) {
        super(pageName);
        this.header = new Header();
        this.summary = document.createElement('div');
        this.summary.className = 'main__summary';
        this.products = document.createElement('div');
        this.products.className = 'main__products';
        this.cards = document.createElement('div');
        this.cards.className = 'main__cards';
        this.pageLength = 3;
        this.pageNumber = 1;
        this.maxPage = 1;
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
        itemsCounter.value = '3';
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

        leftButton.addEventListener('click', (e) => {
            e.preventDefault();
            const numberSpan = <HTMLSpanElement>document.querySelector('.pages__number');
            const pageNumber = numberSpan.textContent;
            if(pageNumber === '1') {
                return;
            } else {
                const page = Number(pageNumber) - 1;
                this.drawPage(page, this.pageLength);
                numberSpan.textContent = `${page}`;
            }
        })

        rightButton.addEventListener('click', (e) => {
            e.preventDefault();
            const numberSpan = <HTMLSpanElement>document.querySelector('.pages__number');
            const pageNumber = numberSpan.textContent;
            if(Number(pageNumber) === this.maxPage) {
                return;   
            }
            else if(this.getLocalStorage().length === 0) {
                return;
            }
            const page = Number(pageNumber) + 1;
            this.drawPage(page, this.pageLength);
            numberSpan.textContent = `${page}`;
        })

        itemsCounter.addEventListener('change', (e) => {
            const target = <HTMLInputElement>e.target;
            const newValue = target.value;
            if(this.getLocalStorage().length === 0) {
                return;
            }
            this.pageLength = Number(newValue);
            this.drawPage(1, this.pageLength);
            const numberSpan = <HTMLSpanElement>document.querySelector('.pages__number');
            numberSpan.textContent = '1';
        })

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

        let finalSumLocalStorage = JSON.parse(localStorage.cartItems)
        let sum = 0;
        let sumCount = 0;
        for (let i = 0; i < finalSumLocalStorage.length; i++) {
            if (finalSumLocalStorage[i]['count'] == undefined) {
                finalSumLocalStorage[i]['count'] = 1;
            }
            sum += finalSumLocalStorage[i]['count'] * finalSumLocalStorage[i]['price'];
            sumCount += finalSumLocalStorage[i]['count'];
        }

        const productsNumber = document.createElement('span');
        productsNumber.className = 'summary__products-number';
        const storageProducts: Product[] = JSON.parse(localStorage.cartItems);
        
        productsNumber.textContent = `${sumCount}`;
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
        const storageSum: number = storageProducts.reduce((sum: number, el: Product) => sum + el.price, 0);

        totalNumber.textContent = `$${sum}` || '$0';
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
        
        buyButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.createCardModule();
            const module = <HTMLElement>document.querySelector('.module-layer');
            module.style.display = 'flex';  
        })

        this.summary.append(summary);
    }

    createCardModule() {
        const moduleLayer = document.createElement('div');
        moduleLayer.className = 'module-layer';
        document.body.append(moduleLayer);

        const formContainer = document.createElement('form');
        formContainer.className = 'form';
        moduleLayer.append(formContainer);

        const detailsTitle = document.createElement('h3');
        detailsTitle.className = 'form__title';
        detailsTitle.textContent = 'Personal details';
        formContainer.append(detailsTitle);

        const nameInput = document.createElement('input');
        nameInput.className = 'form__name';
        nameInput.type = 'text';
        nameInput.placeholder = 'Name';
        nameInput.pattern = '\b[a-zA-Z]{3,20}[a-zA-Z]\b\s\b[a-zA-Z]{3,20}[a-zA-Z]\b(\s/-)\b[a-zA-Z]*\b'; // под вопросом
        nameInput.required = true;
        formContainer.append(nameInput);
        
        const phoneInput = document.createElement('input');
        phoneInput.className = 'form__phone';
        phoneInput.type = 'tel';
        phoneInput.placeholder = 'Phone number';
        phoneInput.pattern = '\+?[0-9\s\-\(\)]+'
        phoneInput.required = true;
        formContainer.append(phoneInput);
        
        const addressInput = document.createElement('input');
        addressInput.className = 'form__address';
        addressInput.type = 'text';
        addressInput.placeholder = 'Delivery address';
        addressInput.required = true;
        formContainer.append(addressInput);
        
        const emailInput = document.createElement('input');
        emailInput.className = 'form__email';
        emailInput.type = 'email';
        emailInput.placeholder = 'E-mail';
        emailInput.required = true;
        formContainer.append(emailInput);

        const cardTitle = document.createElement('h3');
        cardTitle.className = 'form__card-title';
        cardTitle.textContent = 'Credit card details';
        formContainer.append(cardTitle);

        const cardInfo = document.createElement('div');
        cardInfo.className = 'form__card-info card-info';
        formContainer.append(cardInfo);

        const labelNumber = document.createElement('label');
        labelNumber.htmlFor = 'card-number';
        labelNumber.textContent = 'Card\'s number:';
        cardInfo.append(labelNumber);

        const cardNumberInput = document.createElement('input');
        cardNumberInput.id = 'card-number';
        cardNumberInput.type = 'number';
        cardNumberInput.pattern = '[0-9]{16}';
        cardNumberInput.required = true;
        cardInfo.append(cardNumberInput);

        const cardsAdd = document.createElement('div');
        cardsAdd.className = 'card-info__add';
        cardInfo.append(cardsAdd);

        const labelValid = document.createElement('label');
        labelValid.htmlFor = 'valid';
        labelValid.textContent = 'Valid:';
        cardsAdd.append(labelValid);

        const cardValidInput = document.createElement('input');
        cardValidInput.id = 'valid';
        cardValidInput.type = 'number';
        cardValidInput.pattern = '(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])'; // возможно
        cardValidInput.required = true;
        cardsAdd.append(cardValidInput);

        const labelCvv = document.createElement('label');
        labelCvv.htmlFor = 'cvv';
        labelCvv.textContent = 'CVV:';
        cardsAdd.append(labelCvv);

        const cardCvvInput = document.createElement('input');
        cardCvvInput.id = 'cvv';
        cardCvvInput.type = 'number';
        cardCvvInput.pattern = '[0-9]{3}';
        cardCvvInput.required = true;
        cardsAdd.append(cardCvvInput);

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.className = 'form__button button_submit';
        submitButton.textContent = 'Submit';
        formContainer.append(submitButton);

        window.addEventListener('click', (e) => {
            const target = <HTMLElement>e.target;
            if(target.classList.contains('module-layer')) {
                moduleLayer.style.display = 'none';
            }
        })
    }

    private setPageParams(page: number) {
        const url = new URL(window.location.href);
        const pageParam = url.searchParams.get('page');
        if(pageParam) {
            url.searchParams.delete('page');
            url.searchParams.set('page', page.toString());
        } else {
            url.searchParams.set('page', page.toString());
        }
        window.history.pushState(null, '', url);
    }

    private createPaginationArray(itemsPerPage: number) {
        const cartItems = this.getLocalStorage();
        if(cartItems.length === 0) {
            this.showNothingAdded();
        }
        const paginationArr = [];
        for(let i = 0; i < cartItems.length; i += itemsPerPage) {
            paginationArr.push(cartItems.slice(i, i + itemsPerPage));
        }
        this.maxPage = paginationArr.length;
        return paginationArr;
    }

    private drawPage(pageNumber: number, pageLength: number) {
        this.cards.innerHTML = '';
        const pageItems = this.createPaginationArray(pageLength);
        if(pageNumber > pageItems.length) {
            return;
        }
        const itemsToDraw = pageItems[pageNumber - 1];
        let counter = 0;
        if(pageNumber > 1) {
            counter = pageLength * (pageNumber - 1);
        }
        itemsToDraw.forEach((item, index) => {
            const orderNumber = counter + (index + 1);      
            const card = new CartProduct(item, orderNumber);
            const productCard = card.draw();
            this.cards.append(productCard);
        })
        this.setPageParams(pageNumber);
    }

    getLocalStorage() {
        const storageItems: Product[] = JSON.parse(localStorage.cartItems);
        return storageItems;
    }

    showNothingAdded() {
        const noAdded = document.createElement('h2');
        noAdded.className = 'no-added';
        noAdded.textContent = 'Cart is empty';
        this.products.append(noAdded);
    }

    draw() {
        const cartHeader = this.header.draw();
        this.container.append(cartHeader);
        
        const main = document.createElement('main');
        main.className = 'main';
        this.container.append(main);

        main.append(this.products);

        const productsPanel = this.createProductsCounter();
        this.products.append(productsPanel);

        this.products.append(this.cards);

        const url = new URL(window.location.href);
        const pageParam = url.searchParams.get('page') || '';

        if(pageParam) {
            this.drawPage(Number(pageParam), this.pageLength);
        } else {
            this.drawPage(this.pageNumber, this.pageLength);
        }

        main.append(this.summary);

        this.createSummary();

        this.createCardModule();

        return this.container;

    } 
}

export default CartPage;