import Header from '../../components/header/header';
import Filters from '../../components/filters/filters';
class MainPage {
    private container: HTMLElement;
    header: Header;
    filters: Filters;

    constructor() {
        this.container = document.createElement('div');
        this.header = new Header();
        this.filters = new Filters();
    }

    draw() {

        return this.container;
        
    }
}

export default MainPage;