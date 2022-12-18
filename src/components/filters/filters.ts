import './filters.css';
import products from '../../utils/products';
class Filters {

    private drawCategories() {
        //const categoriesNames = ['smartphones', 'laptops', 'fragrances', 'skincare', 'groceries', 'home-decoration', 'furniture', 'tops', 'womens-dresses', 'womens-shoes', 'mens-shirts', 'mens-shoes', 'mens-watches', 'womens-watches', 'womens-bags', 'womens-jewellery', 'sunglasses', 'automotive', 'motorcycle', 'lighting'];
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
        //const brandsNames = ['Apple', 'Samsung', 'OPPO', 'Huawei', 'Microsoft Surface', 'Infinix', 'HP Pavilion', 'Impression of Acqua Di Gio', 'Royal_Mirage', 'Fog Scent Xpressio', 'Al Munakh', 'Lord - Al-Rehab', 'L\'Oreal Paris', 'Hemani Tea', 'Dermive', 'ROREC White Rice', 'Fair & Clear', 'Saaf & Khaas', 'Bake Parlor Big', 'Baking Food Items', 'fauji', 'Dry Rose', 'Boho Decor', 'Flying Wooden', 'LED Lights', 'luxury palace', 'Golden', 'Furniture Bed Set', 'Ratttan Outdoor', 'Kitchen Shelf', 'Multi Purpose', 'AmnaMart', 'Professional Wear', 'Soft Cotton', 'Top Sweater'];
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