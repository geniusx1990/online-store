import Header from '../../components/header/header';
import Filters from '../../components/filters/filters';
import Sort from '../../components/sort/sort';
import Cards from '../../components/cards/cards';
import './main.css';

class MainPage {
    private container: HTMLElement;
    header: Header;
    filters: Filters;
    sort: Sort;
    cards: Cards;

    constructor(pageName: string) {
        this.container = document.createElement('div');
        this.container.className = pageName;
        this.header = new Header();
        this.filters = new Filters();
        this.sort = new Sort();
        this.cards = new Cards();
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

        const cardsMain = this.cards.drawCards();
        content.append(cardsMain);

        return this.container;  
    }
}

export default MainPage;