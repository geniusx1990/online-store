
// const routes: Route[] = [
//     {
//         page: "/404",
//         callback: draw404()
//     },
//     {
//         page: "/",
//         callback: drawMain()
//     },
//     {
//         page: "/cart",
//         callback: drawCart()
//     },
//     {
//         page: "/product",
//         callback: drawProduct()
//     }

// ]

// type Route = {
//     page: string,
//     callback: () => void
// }

// const locationHandler = async () => {
//     let location = window.location.hash.replace('#', '');
//     if(location.length === 0) {
//         location = '/';
//     }
    
//     const route: Route = routes[location] || routes[404];
//     console.log(route)
//     const html = await fetch(route.page).then(res => res.text());
//     const content = <HTMLDivElement>document.querySelector('.content');
//     content.innerHTML = html;
   
// }

// const goToRoute = (htmlName: string) => {

// }

// window.addEventListener('hashchange', locationHandler);
// locationHandler();

// export default locationHandler;