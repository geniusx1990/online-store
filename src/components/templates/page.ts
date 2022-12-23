import Cards from "../cards/cards";
import Filters from "../filters/filters";
import Header from "../header/header";
import Sort from "../sort/sort";


abstract class Page {
    protected container: HTMLElement;
    static TextObject = {};
    header: Header;
    filters: Filters;
    sort: Sort;
    cards: Cards
    
    constructor(pageName: string) {
        this.container = document.createElement('div');
        this.container.className = pageName;
        this.header = new Header();
        this.filters = new Filters();
        this.sort = new Sort();
        this.cards = new Cards();
        
    }

    protected createPageTEST(text: string) {
        const headerTitle = document.createElement('div');
        headerTitle.innerText = text;
        return headerTitle;
    }

    draw() {
        return this.container;
    }

}

export default Page;