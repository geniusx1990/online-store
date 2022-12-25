import MainPage from '../main/main';
import CartPage from '../cart/cart';
import ProductPage from '../product/product';
import Page from '../../components/templates/page';
import products from '../../utils/products';

export enum Pages {
    MainPage = 'main-page',
    CartPage = 'cart-page',
    ProductPage = 'product-page'
}

class App {
    private static container: HTMLElement = document.body;
    private initialPage: MainPage;
 
    constructor() {
        this.initialPage = new MainPage(Pages.MainPage);
    }

    static renderNewPage(idPage: string) {
        App.container.innerHTML = '';
        let page: Page | null = null;

        if (idPage === Pages.MainPage) {
            page = new MainPage(idPage);
        }  else if (idPage === Pages.CartPage) {
            page = new CartPage(idPage);
        } 
 
        if (page) {
            const pageHtml = page.draw()
            App.container.append(pageHtml);
        }
    }

    private enableRouteChangee() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            console.log(hash);
            App.renderNewPage(hash)
        });
    }

    start() {
        App.renderNewPage(Pages.MainPage);
        this.enableRouteChangee();
    }
}

export default App;