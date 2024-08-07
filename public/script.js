import { renderHomePage } from './js/userInterface.js';
import sideBar from './js/sideBar.js';

export const state = { defaultHeroList: [], heroesDataAvaible: false, tempHero: null };

console.info('Heroes data is avaible: ' + state.heroesDataAvaible);

document.addEventListener('DOMContentLoaded', function () {
  renderHomePage();
  sideBar.renderSideBar();
});
