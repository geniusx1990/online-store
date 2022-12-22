import Header from "../../components/header/header";

class CartPage {
    private container: HTMLElement;
    header: Header;

    constructor(pageName: string) {
        this.container = document.createElement('div');
        this.container.className = pageName;
        this.header = new Header();
    }

    draw() {
        const cartHeader = this.header.draw();
        this.container.append(cartHeader);
        return this.constructor;
        
    }
}

export default CartPage;