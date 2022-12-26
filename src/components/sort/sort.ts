import './sort.css';

class Sort {
    private container: HTMLElement;

    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'sort-container';
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

        this.container.append(select);
        return this.container;
    }
}

export default Sort;