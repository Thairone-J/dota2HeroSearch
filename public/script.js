import { renderSideBar, renderHomePage } from './js/userInterface.js';

export const state = { defaultHeroList: [], heroesDataAvaible: false, tempHero: null };

console.info('Heroes data is avaible: ' + state.heroesDataAvaible);

document.addEventListener('DOMContentLoaded', function () {
  renderHomePage();
  renderSideBar();
});
