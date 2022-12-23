import './main.css';
import Page from '../../components/templates/page'

class MainPage extends Page {
    //private container: HTMLElement;
    static TextObject = {
        MainTitle: 'Main Page',
    };
    
    constructor(pageName: string) {
        super(pageName);
        /* this.container = document.createElement('div');
        this.container.className = pageName;
        this.header = new Header();
        this.filters = new Filters();
        this.sort = new Sort();
        this.cards = new Cards(); */
    }



    draw() {
/*         const title = this.createPageTEST(MainPage.TextObject.MainTitle);
        this.container.append(title); */

        const mainHeader = this.header.draw();
        this.container.append(mainHeader);

        const main = document.createElement('main');
        main.className = 'main';
        this.container.append(main);

        const filtersMain = this.filters.drawFilters();
        main.append(filtersMain);

        const content = document.createElement('div');
        content.className = 'content';
        main.append(content);

        const sortingWrapper = document.createElement('div');
        sortingWrapper.className = 'sorting-wrapper';
        content.prepend(sortingWrapper);

        const sortMain = this.sort.drawSort();
        sortingWrapper.append(sortMain);

        const cardsMain = this.cards.drawCards();
        content.append(cardsMain);

        return this.container;
    }
}

export default MainPage;