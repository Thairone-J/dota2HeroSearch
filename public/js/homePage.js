import { state } from '../script.js';
import searchBar from './searchBar.js';

const app = document.getElementById('app');

export function renderHomePage() {
  refreshTmpHeroState();

  removeHomeElementsIfExist().then(() => {
    if (!document.getElementById('searchContainer')) {
      searchBar.renderSearchContainer();
    }
  });

  function removeHomeElementsIfExist() {
    return new Promise((resolve) => {
      const elements = [
        document.getElementById('heroPreviewContainer'),
        document.getElementById('searchContainer'),
      ];

      elements.forEach((element) => {
        if (element) {
          element.style.animation = 'fadeOutBlur 500ms ease-out forwards';
          element.addEventListener('animationend', (event) => {
            if (event.animationName == 'fadeOutBlur') {
              app.removeChild(element);
            }
          });
        }
      });
      resolve();
    });
  }
}

function refreshTmpHeroState() {
  state.tmpHero = undefined;
}
