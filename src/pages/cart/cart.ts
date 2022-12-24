import Page from "../../components/templates/page";
import CartHeader from '../../components/header/cartHeader';
import './cart.css';

class CartPage extends Page {
    header: CartHeader;
  
    constructor(pageName: string) {
        super(pageName);
        this.header = new CartHeader();
    }

    draw() {
       
        
        return this.container;

    } 
}

export default CartPage;