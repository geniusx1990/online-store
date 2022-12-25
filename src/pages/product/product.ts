import CartHeader from "../../components/header/cartHeader";

class ProductPage {
    private container: HTMLElement;
    header: CartHeader;

    constructor(pageName: string) {
        this.container = document.createElement('div');
        this.container.className = pageName;
        this.header = new CartHeader();

    }

    draw() {
        const productHeader = this.header.draw();
        this.container.append(productHeader);

        return this.constructor;    
    }
}

export default ProductPage;