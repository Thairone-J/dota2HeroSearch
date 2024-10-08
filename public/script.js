import { renderHomePage } from './js/homePage.js';
import sideBar from './js/sideBar.js';

export const state = {
  defaultHeroList: [],
  heroesDataAvaible: false,
  tmpHero: null,
  userProfilePicture: 'images/default_pp.jpg',
};

console.info('Heroes data is avaible: ' + state.heroesDataAvaible);

document.addEventListener('DOMContentLoaded', function () {
  renderHomePage();
  sideBar.renderSideBar();
});
