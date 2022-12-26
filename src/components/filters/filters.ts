import './filters.css';
import products from '../../utils/products';
import DualFilter from './dualFilter';
import CheckboxFilter from './checkboxFilter';

class Filters {
    private container: HTMLElement;

    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'main__filters filters';
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

        const categoriesNames = Array.from(new Set(products.products.map(item => item.category)));
        const categories = new CheckboxFilter('categories', categoriesNames);
        const categoriesFilter = categories.draw();
        this.container.append(categoriesFilter);

        const brandsNames = Array.from(new Set(products.products.map(item => item.brand)));
        const brands = new CheckboxFilter('brands', brandsNames);
        const brandsFilter = brands.draw();
        this.container.append(brandsFilter);

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