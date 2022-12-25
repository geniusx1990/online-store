import './main.css';
import Page from '../../components/templates/page'
import Cards from "../../components/cards/cards";
import Filters from "../../components/filters/filters";
import Header from "../../components/header/header";
import Sort from "../../components/sort/sort";
import products from '../../utils/products';

class MainPage extends Page {
    header: Header;
    filters: Filters;
    sort: Sort;
    cards: Cards;
    
    constructor(pageName: string) {
        super(pageName);
        this.header = new Header();
        this.filters = new Filters();
        this.sort = new Sort();
        this.cards = new Cards(products.products); 
    }

    private createLayoutButtons() {
        const buttonWrapper = document.createElement('div');
        buttonWrapper.className = 'layout';

        const buttonSquares = document.createElement('button');
        buttonSquares.className = 'layout__button button_squares';
        buttonWrapper.append(buttonSquares);

        const buttonLines = document.createElement('button');
        buttonLines.className = 'layout__button button_lines';
        buttonWrapper.append(buttonLines);

        return buttonWrapper;
    }

    draw() {

        const mainHeader = this.header.draw();
        this.container.append(mainHeader);

        const main = document.createElement('main');
        main.className = 'main';
        this.container.append(main);

        const filtersMain = this.filters.drawFilters();
        main.append(filtersMain);

        const content = document.createElement('div');
        content.className = 'content';
        main.append(content);

        const sortingWrapper = document.createElement('div');
        sortingWrapper.className = 'sorting-wrapper';
        content.prepend(sortingWrapper);

        const sortMain = this.sort.drawSort();
        sortingWrapper.append(sortMain);

        const itemsFound = document.createElement('div');
        itemsFound.className = 'items-found';
        itemsFound.textContent = `Items found: `;
        sortingWrapper.append(itemsFound);

        const numberItems = document.createElement('span');
        numberItems.className = 'items-found__number';
        itemsFound.append(numberItems);

        const layoutButtons = this.createLayoutButtons();
        sortingWrapper.append(layoutButtons);

        const cardsMain = this.cards.drawCards();
        content.append(cardsMain);

        // const cardsDrawn = document.querySelectorAll('.product_item');
        // const found = cardsDrawn.length;
        // numberItems.textContent = `${found}`;

        return this.container;
    }
}

export default MainPage;