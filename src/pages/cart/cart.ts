import Header from "../../components/header/header";
import Page from "../../components/templates/page";

class CartPage extends Page {
  
    constructor(pageName: string) {
        super(pageName);
/*         this.container = document.createElement('div');
        this.container.className = pageName;
        this.header = new Header(); */
    }

/*     draw() {
        const mainHeader = this.header.draw();
        this.container.append(mainHeader);
        
        return this.constructor;

    } */
}

export default CartPage;