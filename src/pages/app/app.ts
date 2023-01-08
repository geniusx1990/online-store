import MainPage from '../main/main';
import CartPage from '../cart/cart';
import ProductPage from '../product/product';
import Page from '../../components/templates/page';
import { Product } from '../../utils/types';

export enum Pages {
    MainPage = 'main-page',
    CartPage = 'cart-page',
    ProductPage = '^product-page\/(?<productId>[0-9]+)\/?',
}

class App {
    private static container: HTMLElement = document.body;
    private initialPage: MainPage;

    constructor() {
        this.initialPage = new MainPage('main-page');
    }

    static renderNewPage(idPage: string) {

        const projectPageRegex = new RegExp(Pages.ProductPage);
        const matches = idPage.match(projectPageRegex);

        App.container.innerHTML = '';
        let page: Page | null = null;

        if (idPage === Pages.MainPage) {
            page = new MainPage(idPage);
        }  
        else if (idPage === Pages.CartPage) {
            page = new CartPage(idPage);
        }  
        else if (matches !== null && matches.groups !== undefined && matches.groups['productId']) {
            page = new ProductPage(idPage, parseInt(matches.groups['productId']))
        } 

        if (page) {
            const pageHtml = page.draw();
            App.container.append(pageHtml);
        }
    }

    private enableRouteChange() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            App.renderNewPage(hash)
        });
    }

    start() {
        let cartItems: Product[] = [];
        if(!localStorage.cartItems) {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }

        const hash = window.location.hash.slice(1);
        if(hash) {
            App.renderNewPage(hash);
        } else {
            App.renderNewPage(Pages.MainPage); // MainPage
        }

        this.enableRouteChange();

        window.addEventListener('popstate', () => {
            const hash = window.location.hash.slice(1);
            if(hash) {
                App.renderNewPage(hash);
            } else {
                App.renderNewPage(Pages.MainPage);
            }  
        })
    }
}

export default App;