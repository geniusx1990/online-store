import MainPage from '../main/main';
import CartPage from '../cart/cart';
import ProductPage from '../product/product';
import Page from '../../components/templates/page';

export enum Pages {
    MainPage = 'main-page',
    Cartpage = 'cart-page',
    ProductPage = 'product-page'
}

class App {
    private static container: HTMLElement = document.body;
    private initialPage: MainPage;

    static renderNewPage(idPage: string) {
        App.container.innerHTML = '';
        let page: Page | null = null;

        if (idPage === Pages.MainPage) {
            page = new MainPage(idPage);
        }  else if (idPage === Pages.Cartpage) {
            page = new CartPage(idPage);
        } 
 
        if (page) {
            const pageHtml = page.draw()
            App.container.append(pageHtml);
        }
    }

    constructor() {
        this.initialPage = new MainPage(Pages.MainPage);
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
/*         const mainPageHTML = this.initialPage.draw();
        this.container.append(mainPageHTML); */
        // return this.container; 

        //App.renderNewPage('main-page')

    }

}

export default App;