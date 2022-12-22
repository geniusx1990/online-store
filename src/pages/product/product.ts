import Header from "../../components/header/header";

class ProductPage {
    private container: HTMLElement;
    header: Header;

    constructor(pageName: string) {
        this.container = document.createElement('div');
        this.container.className = pageName;
        this.header = new Header();
    }

    draw() {
        const productHeader = this.header.draw();
        this.container.append(productHeader);
        return this.constructor;
        
    }
}

export default ProductPage;