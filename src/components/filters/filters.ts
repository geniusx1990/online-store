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
    
            checkItem.appendChild(checkBox);
            checkItem.appendChild(boxLabel);
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
    
            checkItem.appendChild(checkBox);
            checkItem.appendChild(boxLabel);
            brandsList.appendChild(checkItem);
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

        const buttons = this.createButtons();
        this.container.appendChild(buttons);

        return this.container;
    }
}

export default Filters;