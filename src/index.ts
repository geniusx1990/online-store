import locationHandler from './routes';

window.addEventListener('hashchange', locationHandler);
locationHandler();
console.log('RRRRR')