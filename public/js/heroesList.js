import { state } from '../script.js';
import { loadHeroes } from './heroes.js';

export async function renderHeroesList(eventSource) {
  const sideMenuContainer = document.getElementById('sideMenuContainer');

  const heroesListContainer = document.createElement('div');
  heroesListContainer.id = 'heroesListContainer';
  heroesListContainer.className = 'heroes-list-container';

  sideMenuContainer.appendChild(heroesListContainer);

  const heroesListGrid = document.createElement('div');
  heroesListGrid.id = 'heroesListGrid';
  heroesListGrid.className = 'heroes-list-grid';

  heroesListContainer.appendChild(heroesListGrid);

  switch (eventSource) {
    case 'changeUserPicture':
      if (!state.heroesDataAvaible) {
        await loadHeroes();
      }

      for (let i = 0; i < state.defaultHeroList.length; i++) {
        const item = document.createElement('div');
        item.id = 'heroesListItem';
        item.className = 'heroes-list-item';
        item.style.backgroundImage = `url(${state.defaultHeroList[i].imageVert})`;
        heroesListGrid.appendChild(item);
      }
      break;

    case 'showUserHeroes':
      alert('to do');
      break;

    default:
      return;
  }
}
