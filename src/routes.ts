const pageTitle = 'Online Store';

const routes = {
    404: {
        page: "pages/404.html",
        title: "404 | " + pageTitle,
        description: "Page Not Found"
    },
    "/": {
        page: "pages/index.html",
        title: "Home | " + pageTitle,
        description: "Home page"
    },
    cart: {
        page: "pages/cart.html",
        title: "Shopping cart | " + pageTitle,
        description: "Shopping cart's page"
    },
    product: {
        page: "pages/product.html",
        title: "Product | " + pageTitle,
        description: "Product's page"
    }
}

const locationHandler = async () => {
    let location = window.location.hash.replace('#', '');
    if(location.length === 0) {
        location = "/";
    }
    const route = routes[location] || routes[404];
    const html = await fetch(route.page).then(res => res.text());
    const content = <HTMLDivElement>document.querySelector('.content');
    content.innerHTML = html;
    document.title = route.title;
    document.querySelector('meta[name="description')?.setAttribute('content', route.description);
}

window.addEventListener('hashchange', locationHandler);