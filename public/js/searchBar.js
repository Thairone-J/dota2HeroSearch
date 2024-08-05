import { clearResult } from "./utilities.js";
import { searchHero } from "./heroes.js";

const searchBar = {
    renderSearchContainer: () => {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.id = 'searchContainer';
        app.appendChild(searchContainer);
      
        const searchBarContainer = document.createElement('div');
        searchBarContainer.className = 'search-bar-container';
        searchBarContainer.id = 'searchBarContainer';
      
        searchContainer.appendChild(searchBarContainer);
      
        const resultContainer = document.createElement('div');
        resultContainer.className = 'result-container';
        resultContainer.id = 'resultContainer';
      
        searchContainer.appendChild(resultContainer);
      
        renderSearchBar();
    }
}


  function renderSearchBar() {
    const searchBarContainer = document.getElementById('searchBarContainer');
  
    const searchBar = document.createElement('div');
    searchBar.className = 'search-bar';
    searchBar.id = 'searchBar';
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'searchInput';
    input.autocomplete = 'off';
    input.placeholder = 'Search hero..';
    const icon = document.createElement('img');
    icon.src = './images/icons/search.svg';
  
    input.addEventListener('input', function () {
      if (input.value.trim() === '') {
        clearResult();
      } else {
        searchHero(input.value);
      }
    });
    searchBar.appendChild(input);
    searchBar.appendChild(icon);
    searchBarContainer.appendChild(searchBar);
  }
  
export default searchBar;