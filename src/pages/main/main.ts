import './main.css';
import Page from '../../components/templates/page'
import Card from "../../components/card/card";
import Header from "../../components/header/header";
import Sort from "../../components/sort/sort";
import products from '../../utils/products';
import { Product } from '../../utils/types';
import CheckboxFilter from '../../components/filters/checkboxFilter';
import DualFilter from '../../components/filters/dualFilter';

class MainPage extends Page {
    header: Header;
    filterCategory: CheckboxFilter;
    filterBrand: CheckboxFilter;
    sort: Sort;
    categoriesNames: string[];
    brandsNames: string[];
    priceSlider: DualFilter;
    inStockSlider: DualFilter;
    cardsWrapper: HTMLDivElement;
    
    constructor(pageName: string) {
        super(pageName);
        this.header = new Header();
        this.categoriesNames = Array.from(new Set(products.products.map(item => item.category)));
        this.filterCategory = new CheckboxFilter('categories', this.categoriesNames);
        this.brandsNames = Array.from(new Set(products.products.map(item => item.brand)));
        this.filterBrand = new CheckboxFilter('brands', this.brandsNames);
        this.priceSlider = new DualFilter('price', '0', '2000');
        this.inStockSlider = new DualFilter('stock', '0', '150');
        this.sort = new Sort();
        this.cardsWrapper = document.createElement('div');
        this.cardsWrapper.className = 'cards';
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

    private createFilterButtons() {
        const filterButtons = document.createElement('div');
        filterButtons.className = 'filters__buttons';

        const resetButton = document.createElement('button');
        resetButton.className = 'filters__button button_reset';
        resetButton.textContent = 'Reset Filters';

        const linkButton = document.createElement('button');
        linkButton.className = 'filters__button button_link';
        linkButton.textContent = 'Copy Link';

        filterButtons.append(resetButton);
        filterButtons.append(linkButton);
        
        return filterButtons;
    }

    drawCards(products: Product[]) { 
        products.forEach((item) => {
            const cardItem = new Card();
            const card = cardItem.draw(item);
            this.cardsWrapper.append(card);
        })   
    }

    draw() {
        const mainHeader = this.header.draw();
        this.container.append(mainHeader);

        const main = document.createElement('main');
        main.className = 'main';
        this.container.append(main);

        const filtersContainer = document.createElement('div');
        filtersContainer.className = 'main__filters filters';
        main.append(filtersContainer);

        const title = document.createElement('h2');
        title.className = 'filters__title';
        title.textContent = 'Filters';
        filtersContainer.append(title);

        const categories = this.filterCategory.draw();
        filtersContainer.append(categories);

        const brands = this.filterBrand.draw();
        filtersContainer.append(brands);

        const prices = this.priceSlider.draw();
        filtersContainer.append(prices);

        const stock = this.inStockSlider.draw();
        filtersContainer.append(stock);

        const filtersButtons = this.createFilterButtons();
        filtersContainer.append(filtersButtons);

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

        content.append(this.cardsWrapper);
        this.drawCards(products.products);

        return this.container;
    }
}

export default MainPage;