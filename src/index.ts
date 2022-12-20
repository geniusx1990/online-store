import MainPage from './pages/main/main';
import './global.css';

const mainPage = new MainPage;
const main = mainPage.draw();
document.body.append(main);