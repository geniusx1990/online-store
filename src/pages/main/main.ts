import './main.css';
import Page from '../../components/templates/page'
import Card from "../../components/card/card";
import Header from "../../components/header/header";
import products from '../../utils/products';
import { Product } from '../../utils/types';
import CheckboxFilter from '../../components/filters/checkboxFilter';
import DualFilter from '../../components/filters/dualFilter';

class MainPage extends Page {
    header: Header;
    filterCategory: CheckboxFilter;
    filterBrand: CheckboxFilter;
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

    private createSearchBar() {
        const searchWrapper = document.createElement('form');
        searchWrapper.className = 'search';

        const searchInput = document.createElement('input');
        searchInput.className = 'search__input';
        searchInput.type = 'search';
        searchInput.placeholder = 'Search...';
        searchWrapper.append(searchInput)

        const searchButton = document.createElement('button');
        searchButton.type = 'submit';
        searchButton.className = 'search__button';
        searchWrapper.append(searchButton)

        searchInput.addEventListener('search', (e) => {
            const searchParam = searchInput.value;
            this.searchItems(searchParam);
        })

        return searchWrapper; 
    }

    searchItems(value: string) {

    }

    createSorting() {
        const sortOptions = ['Select sorting options','Sort by price ascending', 'Sort by price descending', 'Sort by brand, A-Z', 'Sort by brand, Z-A'];
        const select = document.createElement('select');
        select.className = 'sorting';
        select.name = 'sort';

        sortOptions.forEach(item => {
            const option = document.createElement('option');
            option.className = 'sort__option';
            option.value = item;
            option.textContent = item;
            select.append(option);
        })

        select.addEventListener('change', (e) => {
            const target = <HTMLOptionElement>e.target;
            this.cardsWrapper.innerHTML = '';
            const newArr = this.sortItems(products.products, target.value);
            this.drawCards(newArr);
        })
        return select;
    }

    sortItems(items: Product[], value: string) {
        if(value === 'Sort by price ascending') {
            items.sort((item1, item2) => item1.price - item2.price);
        }
        else if(value === 'Sort by price descending') {
            items.sort((item1, item2) => item2.price - item1.price);
        }
        else if(value === 'Sort by brand, A-Z') {
            items.sort((item1, item2) => item1.title.localeCompare(item2.title));
        }
        else if(value === 'Sort by brand, Z-A') {
            items.sort((item1, item2) => item2.title.localeCompare(item1.title));
        }
        return items;
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

        const sortMain = this.createSorting();
        sortingWrapper.append(sortMain);

        const search = this.createSearchBar();
        sortingWrapper.append(search);

        // const itemsFound = document.createElement('div');
        // itemsFound.className = 'items-found';
        // itemsFound.textContent = `Items found: `;
        // sortingWrapper.append(itemsFound);

        // const numberItems = document.createElement('span');
        // numberItems.className = 'items-found__number';
        // itemsFound.append(numberItems);

        const layoutButtons = this.createLayoutButtons();
        sortingWrapper.append(layoutButtons);

        content.append(this.cardsWrapper);
        this.drawCards(products.products);

        return this.container;
    }
}

export default MainPage;