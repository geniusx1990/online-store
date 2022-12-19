import './filters.css';
import products from '../../utils/products';
class Filters {

    private drawCategories() {
        const categoriesNames = Array.from(new Set(products.products.map(item => item.category)));

        const categories = document.createElement('div');
        categories.className = 'filters__categories categories';
    
        const categoryTitle = document.createElement('div');
        categoryTitle.className = 'categories__upper';
    
        const title = document.createElement('h3');
        title.className = 'categories__title';
        title.textContent = 'Categories';
        categoryTitle.appendChild(title);
        categories.appendChild(categoryTitle);
    
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
    
        categories.appendChild(categoriesList);
        return categories;
    
    }

    private drawBrands() {
        const brandsNames = Array.from(new Set(products.products.map(item => item.brand)));
        const brands = document.createElement('div');
        brands.className = 'filters__brands brands';
    
        const brandsTitle = document.createElement('div');
        brandsTitle.className = 'brands__upper';
    
        const title = document.createElement('h3');
        title.className = 'brands__title';
        title.textContent = 'Brands';
        brandsTitle.appendChild(title);
        brands.appendChild(brandsTitle);
    
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
    
        brands.appendChild(brandsList);
        return brands;
    
    }

    drawFilters() {

        const filters = document.createElement('div');
        filters.className = 'main__filters filters';

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
        filters.appendChild(filterButtons);

        const categories = this.drawCategories();
        filters.appendChild(categories);

        const brands = this.drawBrands();
        filters.appendChild(brands);

        const content = document.querySelector('.content');
        content?.appendChild(filters);

    }

}






export default Filters;