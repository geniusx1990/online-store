class CheckboxFilter {
    private container: HTMLElement;
    filterName: string;
    listItems: string[];

    constructor(filterName: string, listItems: string[]) {
        this.container = document.createElement('div');
        this.container.className = `${filterName}`;
        this.filterName = filterName;
        this.listItems = listItems;
    }

    private createTitle() {
        const title = document.createElement('h3');
        title.className = `${this.filterName}__title`;;
        title.textContent = `${this.filterName}`;
        
        return title;
    }

    draw() {
        const title = this.createTitle();
        this.container.append(title);

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