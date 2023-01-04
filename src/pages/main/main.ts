import './main.css';
import Page from '../../components/templates/page'
import Card from "../../components/card/card";
import Header from "../../components/header/header";
import products from '../../utils/products';
import { Product } from '../../utils/types';

class MainPage extends Page {
    header: Header;
    cardsWrapper: HTMLDivElement;
    filtersContainer: HTMLDivElement;
    
    constructor(pageName: string) {
        super(pageName);
        this.header = new Header();
        this.filtersContainer = document.createElement('div');
        this.filtersContainer.className = 'main__filters filters';
        this.cardsWrapper = document.createElement('div');
        this.cardsWrapper.className = 'cards';
    }

    createCheckboxFilter(filterName: string, listItems: string[]) {
        const filterWrapper = document.createElement('div');
        filterWrapper.className = `${filterName}`;

        const title = document.createElement('h3');
        title.className = `${filterName}__title`;;
        title.textContent = `${filterName}`;
        filterWrapper.append(title);

        const itemsList = document.createElement('div');
        itemsList.className = `${filterName}__list`;
        filterWrapper.append(itemsList);

        listItems.forEach(item => {
            const checkItem = document.createElement('div');
            checkItem.className = `${filterName}__list-item list-item`;

            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.className = 'list-item__checkbox';
            checkBox.id = item;

            checkBox.addEventListener('change', (e) => {
                const pickedProducts = products.products.filter((el) => el.category === item);
                this.drawCards(pickedProducts);
                // if(this.activeItems.includes(item)) {
                //     this.activeItems = this.activeItems.filter((el) => el !== item);
                    
                    // remove active
                // } else {
                //     this.activeItems.push(item);           
                //     // add class active
                // }
      
            })

            const boxLabel = document.createElement('label');
            boxLabel.className = 'list-item__label'
            boxLabel.htmlFor = item;
            boxLabel.textContent = item;

            let numItems;
            if(filterName === 'categories') {
                numItems = products.products.filter(el => el.category === item).length;
            } else if(filterName === 'brands') {
                numItems = products.products.filter(el => el.brand === item).length;
            }
  
            const numberItems = document.createElement('span');
            numberItems.className = 'list-item__number'
            numberItems.textContent = `(${numItems})`;

            checkItem.append(checkBox);
            checkItem.append(boxLabel);
            checkItem.append(numberItems);
            itemsList.append(checkItem);
        })

        this.filtersContainer.append(filterWrapper);
    }

    createDualFilter(title: string, minValue: string, maxValue: string) {
        const filterWrapper = document.createElement('div');
        filterWrapper.className = `filters__${title}-slider-container`;

        const sliderTitle = document.createElement('h3');
        sliderTitle.className = `${title}__title`;
        sliderTitle.textContent = title;
        filterWrapper.append(sliderTitle);

        const values = document.createElement('div');
        values.className = `${title}-slider__values`;
        filterWrapper.append(values);

        const valueOne = document.createElement('span');
        valueOne.className = `${title}-slider__value-one`;
        valueOne.textContent = `${minValue}`;
        values.append(valueOne);
        
        const dash = document.createElement('span');
        dash.textContent = ' - ';
        values.append(dash);

        const valueTwo = document.createElement('span');
        valueTwo.className = `${title}-slider__value-two`;
        valueTwo.textContent = ` ${maxValue}`;
        values.append(valueTwo);

        const sliderWrapper = document.createElement('div');
        sliderWrapper.className = `filters__${title}-slider slider`;
        filterWrapper.append(sliderWrapper);

        const track = document.createElement('div');
        track.className = `${title}-slider__track`;
        sliderWrapper.append(track);

        const firstInput = document.createElement('input');
        firstInput.type = 'range';
        firstInput.min = minValue;
        firstInput.max = maxValue;
        firstInput.value = minValue;
        firstInput.className = `${title}-slider__input ${title}-input_first`;
        sliderWrapper.append(firstInput);

        const secondInput = document.createElement('input');
        secondInput.type = 'range';
        secondInput.min = minValue;
        secondInput.max = maxValue;
        secondInput.value = maxValue;
        secondInput.className = `${title}-slider__input ${title}-input_second`;
        sliderWrapper.append(secondInput);

        firstInput.addEventListener('input', () => {
            this.slidePricesOne(firstInput, secondInput, 0, valueOne, maxValue, track);
        })

        secondInput.addEventListener('input', () => {
            this.slidePricesTwo(firstInput, secondInput, 0, valueTwo, maxValue, track);
        })

        this.filtersContainer.append(filterWrapper);  
    }

    slidePricesOne(sliderOne: HTMLInputElement, sliderTwo: HTMLInputElement, gap: number, valueOne: HTMLSpanElement, maxValue: string, sliderTrack: HTMLDivElement) {
        if((parseInt(sliderTwo.value) - parseInt(sliderOne.value)) <= gap) {
            sliderOne.value = (parseInt(sliderTwo.value) - gap).toString();
        }
        valueOne.textContent = sliderOne.value;
        this.fillWithColor(sliderOne, sliderTwo, maxValue, sliderTrack);
    }

    slidePricesTwo(sliderOne: HTMLInputElement, sliderTwo: HTMLInputElement, gap: number, valueTwo: HTMLSpanElement, maxValue: string, sliderTrack: HTMLDivElement) {
        if((parseInt(sliderTwo.value) - parseInt(sliderOne.value)) <= gap) {
            sliderTwo.value = (parseInt(sliderOne.value) + gap).toString();
        }
        valueTwo.textContent = sliderTwo.value;
        this.fillWithColor(sliderOne, sliderTwo, maxValue, sliderTrack);
    }

    fillWithColor(sliderOne: HTMLInputElement, sliderTwo: HTMLInputElement, maxValue: string, sliderTrack: HTMLDivElement) {
        let percentOne = (parseInt(sliderOne.value) / parseInt(maxValue)) * 100;
        let percentTwo = (parseInt(sliderTwo.value) / parseInt(maxValue)) * 100;
        sliderTrack.style.background = `linear-gradient(to right, #efefef ${percentOne}%, #333e48 ${percentOne}%, #333e48 ${percentTwo}%, #efefef ${percentTwo}%)`;
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
        const itemsFound = products.products.filter((item) => item.title.toLowerCase().includes(value.toLowerCase()) 
        || item.brand.toLowerCase().includes(value.toLowerCase()) || item.description.toLowerCase().includes(value.toLowerCase())
        || item.category.toLowerCase().includes(value.toLowerCase()));
        this.drawCards(itemsFound);
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
            items.sort((item1, item2) => item1.brand.localeCompare(item2.brand));
        }
        else if(value === 'Sort by brand, Z-A') {
            items.sort((item1, item2) => item2.brand.localeCompare(item1.brand));
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
        this.cardsWrapper.innerHTML = '';
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

        main.append(this.filtersContainer);

        const title = document.createElement('h2');
        title.className = 'filters__title';
        title.textContent = 'Filters';
        this.filtersContainer.append(title);

        const categoriesNames = Array.from(new Set(products.products.map(item => item.category)));
        this.createCheckboxFilter('categories', categoriesNames);

        const brandsNames = Array.from(new Set(products.products.map(item => item.brand)));
        this.createCheckboxFilter('brands', brandsNames);

        this.createDualFilter('price', '0', '2000');

        this.createDualFilter('stock', '0', '150');

        const filtersButtons = this.createFilterButtons();
        this.filtersContainer.append(filtersButtons);

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

        const checkBoxes = document.querySelectorAll('.list-item__checkbox');
        console.log(checkBoxes)

        return this.container;
    }
}

export default MainPage;