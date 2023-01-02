import CartHeader from "../../components/header/cartHeader";
import Page from "../../components/templates/page";
import products from '../../utils/products';
import './product.css';

class ProductPage extends Page {
    header: CartHeader;
    public id: number;
    public url: string;
    constructor(pageName: string) {
        super(pageName);
        this.header = new CartHeader();
        this.id = 1;

        this.url = `product/${this.id}`;
    }


    private createGallery() {

        const galleryImages = document.createElement('div');
        galleryImages.className = 'product-gallery';

        const gallerryWrapper = document.createElement('div');
        gallerryWrapper.className = 'galleryWrapper';

        const bigImageWrapper = document.createElement('div');
        bigImageWrapper.className = 'big-image-wrapper';

        const bigImage = document.createElement('img');
        bigImage.className = 'big-image';
        bigImage.src = products.products[this.id].images[4];
        bigImageWrapper.append(bigImage);

        for (let i = 0; i < products.products[this.id].images.length; i++) {
            const image = document.createElement('img');
            image.className = 'slides';
            image.src = products.products[this.id].images[i];
            image.addEventListener('click', () => {
                bigImage.src = image.src;
            })

            gallerryWrapper.append(image);
        }

        galleryImages.append(gallerryWrapper);
        galleryImages.append(bigImageWrapper);

        return galleryImages;
    }


    private createProductInfo() {

        const productInfo = document.createElement('div');
        productInfo.className = 'product-info';


        let arrayNamesTitles = [`Description:`, 'Discount Percentage:', 'Rating:', 'Stock:', 'Brand:', 'Category:']
        let arraData = [products.products[this.id].description, products.products[this.id].discountPercentage, products.products[this.id].rating, products.products[this.id].stock, products.products[this.id].category]
        for (let i = 0; i < arrayNamesTitles.length; i++) {
            const item = document.createElement('div');
            item.className = 'product-detail-item';

            const itemName = document.createElement('h3');
            const itemData = document.createElement('p');

            itemName.textContent = arrayNamesTitles[i];
            itemData.textContent = `${arraData[i]}`;
            item.append(itemName, itemData);
            productInfo.append(item);
        }

        return productInfo;

    }


    private createPaymentBlock() {
        const addToCart = document.createElement('div');
        addToCart.className = 'add-to-cart-block';

        const priceTitle = document.createElement('h3');
        priceTitle.className = 'price-cart';
        priceTitle.textContent = `${products.products[this.id].price} $`

        const addToCartButton = document.createElement('button');
        addToCartButton.className = 'add-to-cart-button';
        addToCartButton.textContent = 'ADD TO CART';

        const buyNow = document.createElement('button');
        buyNow.className = 'buy-now-button';
        buyNow.textContent = 'BUY NOW';

        addToCart.append(priceTitle, addToCartButton, buyNow);


        return addToCart;
    }

    /*     private createUrls() {
            const arrayOfLinks = []: String;
    
    
            return arrayOfLinks;
        } */


    private createProductPage() {
        const productDetail = document.createElement('div');
        productDetail.className = 'product-detail';

        const productTitle = document.createElement('div');
        productTitle.className = 'product-title';
        productTitle.textContent = products.products[this.id].title;
        productDetail.append(productTitle);


        const productData = document.createElement('div');
        productData.className = 'product-data';


        productData.append(this.createGallery());
        productData.append(this.createProductInfo());
        productData.append(this.createPaymentBlock());

        productDetail.append(productData);
        console.log(window.location.href);
        return productDetail;
    }


    draw() {
        const cartHeader = this.header.draw();
        this.container.append(cartHeader);
        this.container.append(this.createProductPage());

        /*         const productHeader = this.header.draw();
                this.container.append(productHeader); */

        return this.container;
    }
}

export default ProductPage;