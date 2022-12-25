import './filters.css';
import products from '../../utils/products';

class Filters {
    private container: HTMLElement;

    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'main__filters filters';
    }

    private createCategories() {
        const categoriesNames = Array.from(new Set(products.products.map(item => item.category)));

        const categoriesList = document.createElement('div');
        categoriesList.className = 'categories__list';
    
        categoriesNames.forEach(item => {
            const checkItem = document.createElement('div');
            checkItem.className = 'categories__list-item list-item';
    
            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.className = 'list-item__checkbox';
            checkBox.id = item;
    
            const boxLabel = document.createElement('label');
            boxLabel.className = 'list-item__label'
            boxLabel.htmlFor = item;
            boxLabel.textContent = item;

            const numItems = products.products.filter(el => el.category === item).length;
            const numberItems = document.createElement('span');
            numberItems.className = 'list-item__number'
            numberItems.textContent = `(${numItems})`;
    
            checkItem.appendChild(checkBox);
            checkItem.appendChild(boxLabel);
            checkItem.appendChild(numberItems);
            categoriesList.appendChild(checkItem);
        })
        return categoriesList;
    }

    private createBrands() {
        const brandsNames = Array.from(new Set(products.products.map(item => item.brand)));
  
        const brandsList = document.createElement('div');
        brandsList.className = 'brands__list';
    
        brandsNames.forEach(item => {
            const checkItem = document.createElement('div');
            checkItem.className = 'brands__list-item list-item';
    
            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.className = 'list-item__checkbox';
            checkBox.id = item;
    
            const boxLabel = document.createElement('label');
            boxLabel.className = 'list-item__label'
            boxLabel.htmlFor = item;
            boxLabel.textContent = item;

            const numItems = products.products.filter(el => el.brand === item).length;
            const numberItems = document.createElement('span');
            numberItems.className = 'list-item__number'
            numberItems.textContent = `(${numItems})`;
    
            checkItem.append(checkBox);
            checkItem.append(boxLabel);
            checkItem.append(numberItems);
            brandsList.append(checkItem);
        })
        return brandsList; 
    }

    private createDualSliderFilter(title: string, minValue: string, maxValue: string) {
        const sliderContainer = document.createElement('div');
        sliderContainer.className = `filters__${title}-slider-container`;

        const sliderTitle = document.createElement('h3');
        sliderTitle.className = `${title}__title`;
        sliderTitle.textContent = title;
        sliderContainer.append(sliderTitle);

        const values = document.createElement('div');
        values.className = `${title}-slider__values`;
        sliderContainer.append(values);

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
        sliderContainer.append(sliderWrapper);

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

        return sliderContainer;   
    }

    private createButtons() {
        const filterButtons = document.createElement('div');
        filterButtons.className = 'filters__buttons';

        const resetButton = document.createElement('button');
        resetButton.className = 'filters__button button_reset';
        resetButton.textContent = 'Reset Filters';

        const linkButton = document.createElement('button');
        linkButton.className = 'filters__button button_link';
        linkButton.textContent = 'Copy Link';

        filterButtons.appendChild(resetButton);
        filterButtons.appendChild(linkButton);
        this.container.appendChild(filterButtons);
        return filterButtons;
    }

    drawFilters() {
        const title = document.createElement('h2');
        title.className = 'filters__title';
        title.textContent = 'Filters';
        this.container.appendChild(title);

        const categoriesTitle = document.createElement('h3');
        categoriesTitle.className = 'categories__title';
        categoriesTitle.textContent = 'Categories';
        this.container.appendChild(categoriesTitle);

        const categories = this.createCategories();
        this.container.appendChild(categories);

        const brandsTitle = document.createElement('h3');
        brandsTitle.className = 'brands__title';
        brandsTitle.textContent = 'Brands';
        this.container.appendChild(brandsTitle);

        const brands = this.createBrands();
        this.container.appendChild(brands);

        const priceSlider = this.createDualSliderFilter('price', '0', '2000');
        this.container.appendChild(priceSlider);

        const inStockSlider = this.createDualSliderFilter('stock', '0', '150');
        this.container.appendChild(inStockSlider);

        const buttons = this.createButtons();
        this.container.appendChild(buttons);

        return this.container;
    }
}

export default Filters;