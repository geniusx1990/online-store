import MainPage from '../main/main';
import CartPage from '../cart/cart';
import ProductPage from '../product/product';

export enum Pages {
    MainPage = 'main-page',
    Cartpage = 'cart-page',
    ProductPage = 'product-page'
}

class App {
    private container: HTMLElement;
    initialPage: MainPage;

    constructor() {
        this.container = document.body;
        this.initialPage = new MainPage('main-page');
    }

    // renderPage(idPage: string) {
    //     document.body.innerHTML = '';
    //     let page: HTMLElement | null = null;
    //     if(idPage === 'main-page') {
    //         page = new MainPage()
    //     }

    // }

    start() {
        const mainPage = this.initialPage.draw();
        this.container.append(mainPage);
        return this.container;

    }

}

export default App;