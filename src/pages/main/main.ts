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
    sort: string;
    search: string;
    sortingWrapper: any;
    
    constructor(pageName: string) {
        super(pageName);
        this.header = new Header();
        this.filtersContainer = document.createElement('div');
        this.filtersContainer.className = 'main__filters filters';
        this.sortingWrapper = document.createElement('div');
        this.sortingWrapper.className = 'sorting-wrapper';
        this.cardsWrapper = document.createElement('div');
        this.cardsWrapper.className = 'cards';
        this.pickedCategories = [];
        this.pickedBrands = [];
        this.pickedItems = [];
        this.pickedPrice = {min: '0', max: '2000'};
        this.pickedStock = {min: '0', max: '160'};
        this.layout = 'squares'; 
        this.sort = '';
        this.search = '';  
    }


    getFilteredItems() {

        // this.hideNotFound();

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

        picked = this.sortItems(picked, this.sort);

        picked = this.searchItems(this.search, picked);

        // if(picked.length === 0) {
        //     this.showNotFound();
        // }

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

    drawChosenItems() {
        const chosenItems = this.getFilteredItems();
        this.drawCards(chosenItems);
        this.getNumberItems(chosenItems.length);
    }

     // Filters' block

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

    resetAllFilters() {
        const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('.list-item__checkbox');
        checkboxes.forEach((checkbox) => {
            if(checkbox.checked === true) {
                checkbox.checked = false;
            }
        })

        this.pickedCategories = [];
        this.pickedBrands = [];

        const priceSliderContainer = <HTMLDivElement>document.querySelector('.filters__price-slider-container');
        this.filtersContainer.removeChild(priceSliderContainer);
        this.pickedPrice.min = '0';
        this.pickedPrice.max = '2000';

        const stockSliderContainer = <HTMLDivElement>document.querySelector('.filters__stock-slider-container');
        this.filtersContainer.removeChild(stockSliderContainer);
        this.pickedStock.min = '0';
        this.pickedStock.max = '160';

        const buttonsContainer = <HTMLDivElement>document.querySelector('.filters__buttons');
        this.filtersContainer.removeChild(buttonsContainer);

        const sorting = <HTMLSelectElement>document.querySelector('.sorting');
        this.sortingWrapper.removeChild(sorting);
        this.sort = '';

        const searchInput = <HTMLInputElement>document.querySelector('.search__input');
        searchInput.value = '';
        this.search = '';

        const url = new URL(window.location.href);
        url.searchParams.delete('category');
        url.searchParams.delete('brand');
        url.searchParams.delete('price');
        url.searchParams.delete('stock');
        // url.searchParams.delete('layout');
        url.searchParams.delete('sort');
        url.searchParams.delete('search');
        window.history.pushState(null, '', url);

        // this.hideNotFound();
        this.createDualFilter('price', '0', '2000');
        this.createDualFilter('stock', '0', '160');
        this.createFilterButtons();
        this.createSorting();
        this.drawCards(products.products);
        this.getNumberItems(products.products.length);
    }

    private createCheckboxFilter(filterName: string, listItems: string[]) {

        if(filterName === 'categories') {
            const url = new URL(window.location.href);
            const categoryParams = url.searchParams.getAll('category');
            if(categoryParams) {
                categoryParams.forEach((param) =>  {
                    if(this.pickedCategories.includes(param)) {
                        this.pickedCategories = this.pickedCategories.filter((el) => el !== param);
                    } else {
                        this.pickedCategories.push(param);
                    }
                });
            }
        }
        
        if(filterName === 'brands') {
            const url = new URL(window.location.href);
            const brandParams = url.searchParams.getAll('brand');
            if(brandParams) {
                brandParams.forEach((param) =>  {
                    if(this.pickedBrands.includes(param)) {
                        this.pickedBrands = this.pickedBrands.filter((el) => el !== param);
                    } else {
                        this.pickedBrands.push(param);
                    }
                });
            }
        }

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
            checkBox.className = `list-item__checkbox ${filterName}__checkbox`;
            checkBox.id = item;

            if(filterName === 'categories') {
                this.pickedCategories.forEach((category) => {
                    if(item === category) {
                        checkBox.checked = true;
                    }
                })
            }

            if(filterName === 'brands') {
                this.pickedBrands.forEach((brand) => {
                    if(item === brand) {
                        checkBox.checked = true;
                    }
                })
            }

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

        let pickedMin: string = '';
        let pickedMax: string = '';

        if(title === 'price') {
            const url = new URL(window.location.href);
            const param: string = url.searchParams.get('price') || '';
            const params = param.split(',');
            pickedMin = params[0];
            pickedMax = params[1];
        }
        if(title === 'stock') {
            const url = new URL(window.location.href);
            const param: string = url.searchParams.get('stock') || '';
            const params = param.split(',');
            pickedMin = params[0];
            pickedMax = params[1];
        }


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
        if(pickedMin) {
            valueOne.textContent = `${pickedMin}`;
        } else {
            valueOne.textContent = `${minValue}`;
        }
        values.append(valueOne);
        
        const dash = document.createElement('span');
        dash.textContent = ' - ';
        values.append(dash);

        const valueTwo = document.createElement('span');
        valueTwo.className = `${title}-slider__value-two`;
        if(pickedMax) {
            valueTwo.textContent = `${pickedMax}`;
        } else {
            valueTwo.textContent = `${maxValue}`;
        }
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

        if(title === 'price') {
            this.pickedPrice.min = valueOne.textContent;
            this.pickedPrice.max = valueTwo.textContent;
        }

        if(title === 'stock') {
            this.pickedStock.min = valueOne.textContent;
            this.pickedStock.max = valueTwo.textContent;
        }

        const chosenItems = this.getFilteredItems();
        this.drawCards(chosenItems);

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

        resetButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.resetAllFilters();
        })

        const linkButton = document.createElement('button');
        linkButton.className = 'filters__button button_link';
        linkButton.textContent = 'Copy Link';

        linkButton.addEventListener('click', (e) => {
            e.preventDefault();
            const url = window.location.href;
            
            navigator.clipboard.writeText(url)
            .then(() => {
                linkButton.textContent = 'Copied!';
                setTimeout(() => {
                    linkButton.textContent = 'Copy Link';
                }, 1000)
            })
            .catch(err => {
            console.log('Something went wrong', err);
            });
        })

        filterButtons.append(resetButton);
        filterButtons.append(linkButton);
        
        this.filtersContainer.append(filterButtons);
    }

    // Search block

    private addParamsForSearch(value: string) {
        const url = new URL(window.location.href);

        const param: string = url.searchParams.get('search') || '';
        if(param) {
            if(value.length === 0 || this.search === ''){
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
        const url = new URL(window.location.href);
        const searchParam: string = url.searchParams.get('search') || '';

        const searchWrapper = document.createElement('form');
        searchWrapper.className = 'search';

        const searchInput = document.createElement('input');
        searchInput.className = 'search__input';
        searchInput.type = 'search';
        searchInput.placeholder = 'Search...';
        searchWrapper.append(searchInput)

        if(searchParam) {
            searchInput.value = searchParam;
            this.search = searchParam;
        }

        const searchButton = document.createElement('button');
        searchButton.type = 'submit';
        searchButton.className = 'search__button';
        searchWrapper.append(searchButton);

        searchButton.addEventListener('click', (e) => {
            e.preventDefault();
            const searchValue = searchInput.value;
            this.search = searchValue;
            this.addParamsForSearch(searchValue);
            const chosenItems = this.getFilteredItems();
            const found = this.searchItems(searchValue, chosenItems);
            this.drawCards(found);
        });

        return searchWrapper; 
    }

    searchItems(value: string, items: Product[]) {
        // if(value.length === 0) {
        //     this.hideNotFound();
        // }
        // const chosenItems = this.getFilteredItems();
        const itemsFound = items.filter((item) => item.title.toLowerCase().includes(value.toLowerCase()) 
        || item.brand.toLowerCase().includes(value.toLowerCase()) || item.description.toLowerCase().includes(value.toLowerCase())
        || item.category.toLowerCase().includes(value.toLowerCase()) || item.price.toString().includes(value.toLowerCase())
        || item.stock.toString().includes(value.toLowerCase()));
        // if(itemsFound.length === 0) {
        //     this.showNotFound();
        // }
        // this.drawCards(itemsFound);
        // this.getNumberItems(itemsFound.length);
        return itemsFound;
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

        const url = new URL(window.location.href);
        const sortParam: string = url.searchParams.get('sort') || '';

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

        if(sortParam) {
           const sortValue = sortOptions[sortAbbr.indexOf(sortParam) + 1];
           select.value = sortValue;
           this.sort = sortValue;
           console.log(this.sort)
        }

        select.addEventListener('change', (e) => {
            const target = <HTMLOptionElement>e.target;
            const chosenItems = this.getFilteredItems();
            const newArr = this.sortItems(chosenItems, target.value);
            let abbrIndex: number = 0;
            sortOptions.forEach((item, index) => {
                if(target.value === item) {
                    abbrIndex = index;
                    this.sort = target.value;
                }
            })
            this.addParamsForSorting(sortAbbr[abbrIndex - 1]);
            this.drawCards(newArr);
        })
        this.sortingWrapper.prepend(select);
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

        const url = new URL(window.location.href);
        const layoutParam = url.searchParams.get('layout') || '';

        const buttonWrapper = document.createElement('div');
        buttonWrapper.className = 'layout';

        const buttonSquares = document.createElement('button');
        if((layoutParam && layoutParam === 'squares') || !layoutParam) {
            buttonSquares.className = 'layout__button button_squares active-layout';
            this.layout = 'squares';
        } else {
            buttonSquares.className = 'layout__button button_squares';
        }
        buttonWrapper.append(buttonSquares);

        const buttonLines = document.createElement('button');
        if(layoutParam && layoutParam === 'lines') {
            buttonLines.className = 'layout__button button_lines active-layout';
            this.layout = 'lines';
        } else {
            buttonLines.className = 'layout__button button_lines';
        }
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
            this.addParamsForLayout(this.layout);
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
            this.addParamsForLayout(this.layout);
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

        content.prepend(this.sortingWrapper);

        this.createSorting();

        const search = this.createSearchBar();
        this.sortingWrapper.append(search);

        const itemsFound = document.createElement('div');
        itemsFound.className = 'items-found';
        itemsFound.textContent = `Items found: `;
        content.append(itemsFound);

        const numberItems = document.createElement('span');
        numberItems.className = 'items-found__number';
        numberItems.textContent = `${this.getFilteredItems().length}`;
        itemsFound.append(numberItems);

        const notFound = document.createElement('h3');
        notFound.className = 'not-found';
        notFound.textContent = 'No items found';
        content.append(notFound);

        if(numberItems.textContent == '0') {
            notFound.style.display = 'block';
        } else {
            notFound.style.display = 'none';
        }

        const layoutButtons = this.createLayoutButtons();
        this.sortingWrapper.append(layoutButtons);

        content.append(this.cardsWrapper);

        const chosenItems = this.getFilteredItems();
        this.drawCards(chosenItems);

        return this.container;
    }
}

export default MainPage;