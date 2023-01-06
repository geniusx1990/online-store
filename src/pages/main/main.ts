import './main.css';
import Page from '../../components/templates/page'
import Card from "../../components/card/card";
import CardLong from '../../components/cardLong/cardLong';
import Header from "../../components/header/header";
import products from '../../utils/products';
import { Product } from '../../utils/types';

class MainPage extends Page {
    header: Header;
    cardsWrapper: HTMLDivElement;
    filtersContainer: HTMLDivElement;
    pickedCategories: string[];
    pickedBrands: string[];
    pickedItems: Product[];
    pickedPrice: { min: string; max: string; };
    pickedStock: { min: string; max: string; };
    layout: string;
    
    constructor(pageName: string) {
        super(pageName);
        this.header = new Header();
        this.filtersContainer = document.createElement('div');
        this.filtersContainer.className = 'main__filters filters';
        this.cardsWrapper = document.createElement('div');
        this.cardsWrapper.className = 'cards';
        this.pickedCategories = [];
        this.pickedBrands = [];
        this.pickedItems = [];
        this.pickedPrice = {min: '0', max: '2000'};
        this.pickedStock = {min: '0', max: '160'};
        this.layout = 'squares';   
    }


    getFilteredItems() {

        this.hideNotFound();

        const prods: Product[] = [...products.products];
        let res: Product[] = [];
        if(this.pickedCategories.length === 0) {
            res = [...prods];
        }
        this.pickedCategories.forEach((category: string) => {
            prods.forEach((item) => {
                if(item.category === category) {
                    res.push(item);
                }
            })
        })

        let picked: Product[] = [];
        if(this.pickedBrands.length === 0) {
            picked = [... res];
        }
        this.pickedBrands.forEach((brand: string) => {
            res.forEach((item) => {
                if(item.brand === brand) {
                    picked.push(item);
                }
            })
        })

        const minPrice = this.pickedPrice.min;
        const maxPrice = this.pickedPrice.max;
        picked = picked.filter((item) => +item.price >= +minPrice && +item.price <= +maxPrice);

        const minStock = this.pickedStock.min;
        const maxStock = this.pickedStock.max;
        picked = picked.filter((item) => +item.stock >= +minStock && +item.stock <= +maxStock);

        if(picked.length === 0) {
            this.showNotFound();
        }

        return picked;
    }

    drawCards(products: Product[]) { 
        this.cardsWrapper.innerHTML = '';
        if(this.layout === 'lines') {
            this.cardsWrapper.classList.add('long-cards');
            products.forEach((item) => {
                const cardItem = new CardLong();
                const card = cardItem.draw(item);
                this.cardsWrapper.append(card);
            })
        } else {
            if(this.cardsWrapper.classList.contains('long-cards')) {
                this.cardsWrapper.classList.remove('long-cards');
            }
            products.forEach((item) => {
                const cardItem = new Card();
                const card = cardItem.draw(item);
                this.cardsWrapper.append(card);
            })   
        }
    }

    // getParams() {
    //     const urlStr = window.location.pathname;

    //     const url = urlStr.split('?')[0];

    //     const paramsArr = Object.entries(this.params);

    //     let resArr = paramsArr.map((item) => {
    //         const [param, values] = item;
    //         let resultValues;
    //         if(values.length === 0) {
    //             return '';
    //         }

    //         if(Array.isArray(values)) {
    //             resultValues = values.join(',')
    //         }else {
    //             resultValues = values;
    //         }
    //         return `${param}=${values}`;
    //     })

    //     resArr = resArr.filter((item) => item.length !== 0); 

    //     const paramsUrl = `?${resArr.join('&')}`;

    //     const endUrl = url + paramsUrl;
        
    //     window.history.pushState({}, '', endUrl);
    // }

    drawChosenItems() {
        const chosenItems = this.getFilteredItems();
        this.drawCards(chosenItems);
        this.getNumberItems(chosenItems.length);
    }

    private addParamsForCheckboxFilters(name: string, item: string) {
        const url = new URL(window.location.href);
        const param: string = url.searchParams.get(name) || '';
        if(param) {
            url.searchParams.append(name, item);
        } else {
            url.searchParams.set(name, item);
        }
        window.history.pushState(null, '', url);
    }

     // Filters' block
    private removeParamForCheckboxFilters(name: string, item: string) {
        const url = new URL(window.location.href);
        const allParams = url.searchParams.getAll(name);
        const leftItems = allParams.filter((el) => el !== item);
        url.searchParams.delete(name);
        if(leftItems.length) {
            leftItems.forEach((param) => {
                url.searchParams.append(name, param);
            })
        }
        window.history.pushState(null, '', url);
    }

    private createCheckboxFilter(filterName: string, listItems: string[]) {
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
                if(filterName === 'categories') {
                    if(this.pickedCategories.includes(item)) {
                        this.pickedCategories = this.pickedCategories.filter((el) => el !== item);
                        this.removeParamForCheckboxFilters('category', item);
                        this.drawChosenItems();      
                    } else {
                        this.pickedCategories.push(item);
                        this.addParamsForCheckboxFilters('category', item);
                        this.drawChosenItems();
                    }
                }
                if(filterName === 'brands') {
                    if(this.pickedBrands.includes(item)) {
                        this.pickedBrands = this.pickedBrands.filter((el) => el !== item);
                        this.removeParamForCheckboxFilters('brand', item);
                        this.drawChosenItems();
                    } else {
                        this.pickedBrands.push(item);
                        this.addParamsForCheckboxFilters('brand', item);
                        this.drawChosenItems();
                    }
                }
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

    private addParamsForSliderFilters(name: string, min: string, max: string) {
        const url = new URL(window.location.href);

        const param: string = url.searchParams.get(name) || '';
        if(param) {
            url.searchParams.delete(name);
            url.searchParams.append(name, `${min},${max}`);
        } else {
            url.searchParams.set(name, `${min},${max}`);
        }
        window.history.pushState(null, '', url);
    }

    private createDualFilter(title: string, minValue: string, maxValue: string) {
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

        firstInput.addEventListener('mouseup', () => {
            if(title === 'price') {
                const valueOne = <HTMLSpanElement>document.querySelector('.price-slider__value-one');
                const val1 = valueOne.textContent;
                const valueTwo = <HTMLSpanElement>document.querySelector('.price-slider__value-two');
                const val2 = valueTwo.textContent;
                if(val1 !== null && val2 !== null) {
                    this.pickedPrice.min = val1;
                    this.addParamsForSliderFilters('price', val1, val2);
                    this.drawChosenItems();
                }   
            }
            if(title === 'stock') {
                const valueOne = <HTMLSpanElement>document.querySelector('.stock-slider__value-one');
                const val1 = valueOne.textContent;
                const valueTwo = <HTMLSpanElement>document.querySelector('.stock-slider__value-two');
                const val2 = valueTwo.textContent;
                if(val1 !== null && val2 !== null) {
                    this.pickedStock.min = val1;
                    this.addParamsForSliderFilters('stock', val1, val2);
                    this.drawChosenItems();
                }   
            } 
        })

        secondInput.addEventListener('mouseup', () => {
            if(title === 'price') {
                const valueOne = <HTMLSpanElement>document.querySelector('.price-slider__value-one');
                const val1 = valueOne.textContent;
                const valueTwo = <HTMLSpanElement>document.querySelector('.price-slider__value-two');
                const val2 = valueTwo.textContent;
                if(val1 !== null && val2 !== null) {
                    this.pickedPrice.max = val2;
                    this.addParamsForSliderFilters('price', val1, val2);
                    this.drawChosenItems();
                }   
            }
            if(title === 'stock') {
                const valueOne = <HTMLSpanElement>document.querySelector('.stock-slider__value-one');
                const val1 = valueOne.textContent;
                const valueTwo = <HTMLSpanElement>document.querySelector('.stock-slider__value-two');
                const val2 = valueTwo.textContent;
                if(val1 !== null && val2 !== null) {
                    this.pickedStock.max = val2;
                    this.addParamsForSliderFilters('stock', val1, val2);
                    this.drawChosenItems();
                }   
            } 
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

    private createFilterButtons() {
        const filterButtons = document.createElement('div');
        filterButtons.className = 'filters__buttons';

        const resetButton = document.createElement('button');
        resetButton.className = 'filters__button button_reset';
        resetButton.textContent = 'Reset Filters';

        // resetButton.addEventListener('click', (e) => {
        //     e.preventDefault();
        //     window.location.href = '#main-page';
        // })

        const linkButton = document.createElement('button');
        linkButton.className = 'filters__button button_link';
        linkButton.textContent = 'Copy Link';

        filterButtons.append(resetButton);
        filterButtons.append(linkButton);
        
        this.filtersContainer.append(filterButtons);
    }

    // Search block
    private addParamsForSearch(value: string) {
        const url = new URL(window.location.href);

        const param: string = url.searchParams.get('search') || '';
        if(param) {
            if(value.length === 0){
                url.searchParams.delete('search');
            } else {
                url.searchParams.delete('search');
                url.searchParams.append('search', value);
            }
        } else {
            url.searchParams.set('search', value);
        }
        window.history.pushState(null, '', url);
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
        searchWrapper.append(searchButton);

        searchButton.addEventListener('click', (e) => {
            e.preventDefault();
            const searchValue = searchInput.value;
            this.addParamsForSearch(searchValue);
            this.searchItems(searchValue);
        });

        return searchWrapper; 
    }

    searchItems(value: string) {
        if(value.length === 0) {
            this.hideNotFound();
        }
        const chosenItems = this.getFilteredItems();
        const itemsFound = chosenItems.filter((item) => item.title.toLowerCase().includes(value.toLowerCase()) 
        || item.brand.toLowerCase().includes(value.toLowerCase()) || item.description.toLowerCase().includes(value.toLowerCase())
        || item.category.toLowerCase().includes(value.toLowerCase()) || item.price.toString().includes(value.toLowerCase())
        || item.stock.toString().includes(value.toLowerCase()));
        if(itemsFound.length === 0) {
            this.showNotFound();
        }
        this.drawCards(itemsFound);
        this.getNumberItems(itemsFound.length);
    }

    private addParamsForSorting(value: string) {
        const url = new URL(window.location.href);

        const param: string = url.searchParams.get('sort') || '';
        if(param) {
            url.searchParams.delete('sort');
            url.searchParams.append('sort', value);
        } else {
            url.searchParams.set('sort', value);
        }
        window.history.pushState(null, '', url);
    }

    private createSorting() {
        const sortOptions = ['Select sorting options','Sort by price ascending', 'Sort by price descending', 'Sort by brand, A-Z', 'Sort by brand, Z-A'];
        const sortAbbr = ['ASC', 'DES', 'A-Z', 'Z-A'];
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
            const chosenItems = this.getFilteredItems();
            const newArr = this.sortItems(chosenItems, target.value);
            let abbrIndex: number = 0;
            sortOptions.forEach((item, index) => {
                if(target.value === item) {
                    abbrIndex = index;
                }
            })
            this.addParamsForSorting(sortAbbr[abbrIndex - 1]);
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

    private addParamsForLayout(value: string) {
        const url = new URL(window.location.href);

        const param: string = url.searchParams.get('layout') || '';
        if(param) {
            url.searchParams.delete('layout');
            url.searchParams.append('layout', value);
        } else {
            url.searchParams.set('layout', value);
        }
        window.history.pushState(null, '', url);
    }

    private createLayoutButtons() {
        const buttonWrapper = document.createElement('div');
        buttonWrapper.className = 'layout';

        const buttonSquares = document.createElement('button');
        buttonSquares.className = 'layout__button button_squares active-layout';
        buttonWrapper.append(buttonSquares);

        const buttonLines = document.createElement('button');
        buttonLines.className = 'layout__button button_lines';
        buttonWrapper.append(buttonLines);

        buttonSquares.addEventListener('click', (e) => {
            e.preventDefault();
            const target = <HTMLButtonElement>e.target; 
            if(target.classList.contains('active-layout')) {
                return;
            }
            target.classList.add('active-layout');
            buttonLines.classList.remove('active-layout');
            this.layout = 'squares';
            this. addParamsForLayout(this.layout);
            const pickedItems = this.getFilteredItems();
            this.drawCards(pickedItems);
        })

        buttonLines.addEventListener('click', (e) => {
            e.preventDefault();
            const target = <HTMLButtonElement>e.target; 
            if(target.classList.contains('active-layout')) {
                return;
            }
            target.classList.add('active-layout');
            buttonSquares.classList.remove('active-layout');
            this.layout = 'lines';
            this. addParamsForLayout(this.layout);
            const pickedItems = this.getFilteredItems();
            this.drawCards(pickedItems);
        })

        return buttonWrapper;
    }

    // additional functions
    getNumberItems(num: number) {
        const numberCards = <HTMLSpanElement>document.querySelector('.items-found__number');
        numberCards.textContent = `${num}`;
    }

    showNotFound() {
        const notFound = <HTMLHeadingElement>document.querySelector('.not-found');
        notFound.style.display = 'block';
    }

    hideNotFound() {
        const notFound = <HTMLHeadingElement>document.querySelector('.not-found');
        notFound.style.display = 'none';
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

        this.createDualFilter('stock', '0', '160');

        this.createFilterButtons();

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

        const itemsFound = document.createElement('div');
        itemsFound.className = 'items-found';
        itemsFound.textContent = `Items found: `;
        content.append(itemsFound);

        const numberItems = document.createElement('span');
        numberItems.className = 'items-found__number';
        if(numberItems !== null) {
            numberItems.textContent = `${products.products.length}`;
        }
        itemsFound.append(numberItems);

        const notFound = document.createElement('h3');
        notFound.className = 'not-found';
        notFound.textContent = 'No items found';
        content.append(notFound);

        const layoutButtons = this.createLayoutButtons();
        sortingWrapper.append(layoutButtons);

        content.append(this.cardsWrapper);
        this.drawCards(products.products);

        return this.container;
    }
}

export default MainPage;