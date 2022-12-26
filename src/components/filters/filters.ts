import './filters.css';
import products from '../../utils/products';
import DualFilter from '../filters/dualFilter';

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
    
            checkItem.append(checkBox);
            checkItem.append(boxLabel);
            checkItem.append(numberItems);
            categoriesList.append(checkItem);
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

    private createButtons() {
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
        this.container.append(filterButtons);
        return filterButtons;
    }

    drawFilters() {
        const title = document.createElement('h2');
        title.className = 'filters__title';
        title.textContent = 'Filters';
        this.container.append(title);

        const categoriesTitle = document.createElement('h3');
        categoriesTitle.className = 'categories__title';
        categoriesTitle.textContent = 'Categories';
        this.container.append(categoriesTitle);

        const categories = this.createCategories();
        this.container.append(categories);

        const brandsTitle = document.createElement('h3');
        brandsTitle.className = 'brands__title';
        brandsTitle.textContent = 'Brands';
        this.container.append(brandsTitle);

        const brands = this.createBrands();
        this.container.append(brands);

        const priceSlider = new DualFilter('price', '0', '2000');
        const mainPriceSlider = priceSlider.draw();
        this.container.append(mainPriceSlider);

        const inStockSlider = new DualFilter('stock', '0', '150');
        this.container.append(inStockSlider.draw());

        const buttons = this.createButtons();
        this.container.append(buttons);

        return this.container;
    }
}

export default Filters;