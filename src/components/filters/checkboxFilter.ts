import { Product } from "../../utils/types";
import products from '../../utils/products';
import Hash from '../../utils/hash';
import './filters.css';

class CheckboxFilter {
    private container: HTMLElement;
    filterName: string;
    listItems: string[];
    products: { products: Product[] };
    activeItems: string[];
    hashItem: Hash;

    constructor(filterName: string, listItems: string[]) {
        this.container = document.createElement('div');
        this.container.className = `${filterName}`;
        this.filterName = filterName;
        this.listItems = listItems;
        this.products = products;
        this.activeItems = [];
        this.hashItem = new Hash();
    }

    private createTitle() {
        const title = document.createElement('h3');
        title.className = `${this.filterName}__title`;;
        title.textContent = `${this.filterName}`;
        this.container.append(title);
    }

    getActiveItems() {
        return this.activeItems;
    }

    draw() {
        this.createTitle();
        
        const itemsList = document.createElement('div');
        itemsList.className = `${this.filterName}__list`;
        this.container.append(itemsList);

        this.listItems.forEach(item => {
            const checkItem = document.createElement('div');
            checkItem.className = `${this.filterName}__list-item list-item`;

            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.className = 'list-item__checkbox';
            checkBox.id = item;

            checkBox.addEventListener('change', (e) => {
                if(this.activeItems.includes(item)) {
                    this.activeItems = this.activeItems.filter((el) => el !== item);
                    this.hashItem.addHash(this.activeItems, this.filterName);
                    // remove active

                } else {
                    this.activeItems.push(item);
                    this.hashItem.addHash(this.activeItems, this.filterName);             
                    // add class active
                }
      
            })

            const boxLabel = document.createElement('label');
            boxLabel.className = 'list-item__label'
            boxLabel.htmlFor = item;
            boxLabel.textContent = item;

            // const numItems = products.products.filter(el => el.category === item).length;
            const numberItems = document.createElement('span');
            numberItems.className = 'list-item__number'
            // numberItems.textContent = `(${numItems})`;

            checkItem.append(checkBox);
            checkItem.append(boxLabel);
            checkItem.append(numberItems);
            itemsList.append(checkItem);
        })

        return this.container;
    }
}

export default CheckboxFilter;