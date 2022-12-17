const pageTitle = 'Online Store';

const routes = {
    404: {
        page: "/pages/404/404.html",
        title: "404 | " + pageTitle,
        description: "Page Not Found"
    },
    home: {
        page: "/pages/main/index.html",
        title: "Home | " + pageTitle,
        description: "Home page"
    },
    cart: {
        page: "/pages/cart/cart.html",
        title: "Shopping cart | " + pageTitle,
        description: "Shopping cart's page"
    },
    product: {
        page: "/pages/product/product.html",
        title: "Product | " + pageTitle,
        description: "Product's page"
    }
}

type Route = {
    page: string,
    title: string,
    description: string
}

const locationHandler = async () => {
    let location = window.location.hash.replace('#', '');
    if(location.length === 0) {
        location = 'home';
    }
    
    const route: Route = routes[location] || routes[404];
    const html = await fetch(route.page).then(res => res.text());
    const content = <HTMLDivElement>document.querySelector('.content');
    content.innerHTML = html;
    document.title = route.title;
    document.querySelector('meta[name="description')?.setAttribute('content', route.description);
}

export default locationHandler;