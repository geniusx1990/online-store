import Header from "../../components/header/header";
import Modal from "../../components/modal/modal";
import Page from "../../components/templates/page";
import products from '../../utils/products';
import { Product } from "../../utils/types";
import './product.css';

class ProductPage extends Page {
    header: Header;
    public id: number;
    constructor(pageName: string, productId: number) {
        super(pageName);
        this.header = new Header();
        this.id = productId;
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
        bigImage.src = products.products.filter(x => x.id === this.id)[0].images[4];
        bigImageWrapper.append(bigImage);

        for (let i = 0; i < products.products.filter(x => x.id === this.id)[0].images.length; i++) {
            const image = document.createElement('img');
            image.className = 'slides';
            image.src = products.products.filter(x => x.id === this.id)[0].images[i];

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

        let arrayNamesTitles = ['Description:', 'Discount Percentage:', 'Rating:', 'Stock:', 'Brand:', 'Category:']
        let arraData = [products.products.filter(x => x.id === this.id)[0].description, products.products.filter(x => x.id === this.id)[0].discountPercentage, products.products.filter(x => x.id === this.id)[0].rating, products.products.filter(x => x.id === this.id)[0].stock, products.products.filter(x => x.id === this.id)[0].brand, products.products.filter(x => x.id === this.id)[0].category]
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
        priceTitle.textContent = `${products.products.filter(x => x.id === this.id)[0].price} $`

        const addToCartButton = document.createElement('button');
        addToCartButton.className = 'add-to-cart-button';
        addToCartButton.textContent = 'ADD TO CART';

        let itemsInStorage = JSON.parse(localStorage.cartItems);
        if (itemsInStorage.length !== 0) {
            for (let i = 0; i < itemsInStorage.length; i++) {
                if (itemsInStorage[i]['id'] == this.id) {
                    addToCartButton.className = 'add-to-cart-button remove-from-cart';
                    addToCartButton.textContent = 'REMOVE FROM CART';
                }
            }
        }




        addToCartButton.addEventListener('click', (e) => {
            e.preventDefault();
            const productsCounter = <HTMLDivElement>document.querySelector('.header__products-number');
            const headerTotalSum = <HTMLDivElement>document.querySelector('.header__total-sum');

            addToCartButton.classList.toggle('remove-from-cart')
            if (addToCartButton.classList.contains('remove-from-cart')) {
                addToCartButton.className = 'add-to-cart-button remove-from-cart';
                addToCartButton.textContent = 'REMOVE FROM CART'

                let itemsInStorage: Product[] = JSON.parse(localStorage.cartItems);

                if (itemsInStorage.some((item: Product) => item.id === this.id)) {
                    return;
                } else {
                    itemsInStorage.push(products.products[this.id - 1]);
                    localStorage.cartItems = JSON.stringify(itemsInStorage);
                    let test = JSON.parse(localStorage.cartItems);
                    let sumOfItems = 0;
                    let sum = 0;
                    for (let i = 0; i < test.length; i++) {
                        if (test[i]['count'] == undefined) {
                            test[i]['count'] = 1;
                        }
                        sumOfItems += test[i]['count'];
                        sum += test[i]['count'] * test[i]['price'];

                    }
                    productsCounter.textContent = `${sumOfItems}`;
                    headerTotalSum.textContent = `${sum} $`;

                }

            } else {
                addToCartButton.className = 'add-to-cart-button';
                addToCartButton.textContent = 'ADD TO CART'
                let itemsInStorage: Product[] = JSON.parse(localStorage.cartItems);
                let newItemStorage = itemsInStorage.filter((x: Product) => x.id !== this.id)
                localStorage.removeItem('cartItems')
                localStorage.cartItems = JSON.stringify(newItemStorage);

                let test = JSON.parse(localStorage.cartItems);
                let sumOfItems = 0;
                let sum = 0;
                for (let i = 0; i < test.length; i++) {
                    if (test[i]['count'] == undefined) {
                        test[i]['count'] = 1;
                    }
                    sumOfItems += test[i]['count'];
                    sum += test[i]['count'] * test[i]['price'];

                }
                productsCounter.textContent = `${sumOfItems}`;
                headerTotalSum.textContent = `${sum} $`;

            }



        })

        const buyNow = document.createElement('button');
        buyNow.className = 'buy-now-button';
        buyNow.textContent = 'BUY NOW';

        buyNow.addEventListener('click', (e) => {
            e.preventDefault();
            let itemsInStorage: Product[] = JSON.parse(localStorage.cartItems);

            if (itemsInStorage.some((item: Product) => item.id === this.id)) {
                window.location.href = '#cart-page';
                const modal = new Modal();
                modal.draw();
            } else {
                const productsCounter = <HTMLDivElement>document.querySelector('.header__products-number');
                const headerTotalSum = <HTMLDivElement>document.querySelector('.header__total-sum');
                itemsInStorage.push(products.products[this.id - 1]);
                localStorage.cartItems = JSON.stringify(itemsInStorage);
                let test = JSON.parse(localStorage.cartItems);
                let sumOfItems = 0;
                let sum = 0;
                for (let i = 0; i < test.length; i++) {
                    if (test[i]['count'] == undefined) {
                        test[i]['count'] = 1;
                    }
                    sumOfItems += test[i]['count'];
                    sum += test[i]['count'] * test[i]['price'];

                }
                productsCounter.textContent = `${sumOfItems}`;
                headerTotalSum.textContent = `${sum} $`;
                window.location.href = '#cart-page';
                const modal = new Modal();
                modal.draw();
            }

            
        })

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
        productTitle.textContent = products.products.filter(x => x.id === this.id)[0].title;
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


        return this.container;
    }
}

export default ProductPage;