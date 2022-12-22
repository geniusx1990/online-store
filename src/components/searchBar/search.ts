import './search.css';

class SearchBar {
    private container: HTMLElement;

    constructor() {
        this.container = document.createElement('form');
        this.container.className = 'search';
    }

    private createSearchBar() {
        const searchInput = document.createElement('input');
        searchInput.className = 'search__input';
        searchInput.type = 'text';
        searchInput.placeholder = 'Search...';
        return searchInput; 
    }

    private createSearchButton() {
        const searchButton = document.createElement('button');
        searchButton.type = 'submit';
        searchButton.className = 'search__button';
        return searchButton;
    }

    draw() {
        const searchBar = this.createSearchBar();
        this.container.append(searchBar);
        const searchButton = this.createSearchButton();
        this.container.append(searchButton);
        return this.container;
    }
}

export default SearchBar;