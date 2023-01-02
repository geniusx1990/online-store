import products from '../../utils/products';
import { Product } from '../../utils/types';
import './sort.css';

class Sort {
    private container: HTMLElement;

    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'sort-container';
    }

    sortItems(items: Product[], value: string) {
        if(value === 'Sort by price ascending') {
            items.sort((item1, item2) => item1.price - item2.price);
        }
        else if(value === 'Sort by price descending') {
            items.sort((item1, item2) => item2.price - item1.price);
        }
        console.log(items)
    }

    drawSort() {
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
            
            
        })

        this.container.append(select);
        return this.container;
    }
}

export default Sort;