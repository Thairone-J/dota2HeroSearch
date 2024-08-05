import { loadHeroes } from './heroes.js';
import { login, register } from './auth.js';
import { shuffleImg, clearAttrIcons, allowOnlyNumbers } from './utilities.js';
import { state } from '../script.js';
import searchBar from './searchBar.js';
const app = document.getElementById('app');

export function renderHomePage() {
  removeHomeElementsIfExist();
  setTimeout(() => {
    searchBar.renderSearchContainer();
  }, 600);

  function removeHomeElementsIfExist() {
    state.tempHero = undefined;
    const heroPreviewContainer = document.getElementById('heroPreviewContainer');
    const searchContainer = document.getElementById('searchContainer');

    const elements = [heroPreviewContainer, searchContainer];

    elements.forEach((element) => {
      if (element) {
        element.style.animation = 'fadeOutBlur 500ms ease-out forwards';
        setTimeout(() => {
          app.removeChild(element);
        }, 550);
      }
    });
  }
}

export function showHeroEditor() {
  if (!state.heroesDataAvaible) {
    loadHeroes();
  }

  const emptyHero = { name: 'New Hero', mainAttr: undefined, agi: 0, str: 0, intel: 0 };

  const heroPreviewContainer = document.getElementById('heroPreviewContainer');
  if (!heroPreviewContainer) {
    renderHeroCard();
    showHero(emptyHero);
  }
}
