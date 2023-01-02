import CartHeader from "../../components/header/cartHeader";
import Page from '../../components/templates/page';

class ProductPage extends Page{
    header: CartHeader;

    constructor(pageName: string) {
        super(pageName)
        this.header = new CartHeader();

    }

    draw() {
        const productHeader = this.header.draw();
        this.container.append(productHeader);

        return this.container;    
    }
}

export default ProductPage;