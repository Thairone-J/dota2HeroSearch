import { state } from '../script.js';
import { loadHeroes } from './heroes.js';

export function renderHeroesList(event) {
  const sideMenuContainer = document.getElementById('sideMenuContainer');
  const existingElement = document.getElementById('heroesListContainer');
  if (existingElement) {
    sideMenuContainer.removeChild(existingElement);
  }

  const heroesListContainer = document.createElement('div');
  heroesListContainer.id = 'heroesListContainer';
  heroesListContainer.className = 'heroes-list-container';

  sideMenuContainer.appendChild(heroesListContainer);

  const heroesListGrid = document.createElement('div');

  heroesListGrid.id = 'heroesListGrid';
  heroesListGrid.className = 'heroes-list-grid';

  heroesListContainer.appendChild(heroesListGrid);
  handleEventSource(event);
}

async function handleEventSource(event) {
  switch (event) {
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
