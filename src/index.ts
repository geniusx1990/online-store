import Header from './components/header/header';
import Filters from './components/filters/filters';
import './global.css';

const header = new Header();
header.drawHeader();

const filters = new Filters();
filters.drawFilters();