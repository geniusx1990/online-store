import MainPage from '../main/main';
import CartPage from '../cart/cart';
import ProductPage from '../product/product';
import Page from '../../components/templates/page';
import products from '../../utils/products';
import { Product } from '../../utils/types';

export enum Pages {
    MainPage = 'main-page',
    CartPage = 'cart-page',
    ProductPage = 'product-page'
}

class App {
    private static container: HTMLElement = document.body;
    private initialPage: MainPage;

    constructor() {
        this.initialPage = new MainPage('main-page');
    }

    static renderNewPage(idPage: string) {
        App.container.innerHTML = '';
        let page: Page | null = null;

        if (idPage === Pages.MainPage) {
            page = new MainPage(idPage);
        }  
        else if (idPage === Pages.CartPage) {
            page = new CartPage(idPage);
        }
        else if (idPage === Pages.ProductPage) {
            page = new ProductPage(idPage);
        }
 
        if (page) {
            const pageHtml = page.draw();
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
        let cartItems: Product[] = [];
        if(!localStorage.cartItems) {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }

        App.renderNewPage(Pages.MainPage);
        window.location.href = window.location.href + `#${Pages.MainPage}`;
        this.enableRouteChangee();

        // window.addEventListener("beforeunload", function(e) {
            
        // });

    }
}

export default App;