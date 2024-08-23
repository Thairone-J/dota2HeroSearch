import { loadHeroes } from './heroes.js';
import { state } from '../script.js';
import { chooseProfilePicture } from './profilePicture.js';

const heroesList = {
  render: async (element) => {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    if (!state.heroesDataAvaible) {
      await loadHeroes();
    }

    element.className = '';
    element.className = 'heroes-img-list-container';

    const imageListGrid = document.createElement('div');
    imageListGrid.id = 'imageListGrid';
    imageListGrid.className = 'image-list-grid';
    element.appendChild(imageListGrid);
    for (let i = 0; i < state.defaultHeroList.length; i++) {
      const item = document.createElement('img');
      item.src = `${state.defaultHeroList[i].imageVert}`;
      item.className = 'list-item';
      imageListGrid.appendChild(item);
      item.addEventListener('click', () => {
        state.userProfilePicture = saveImgPath(item);
        chooseProfilePicture();
      });
    }
  },
};

const saveImgPath = (img) => {
  const index = img.src.indexOf('images/');
  return img.src.substring(index);
};

export default heroesList;
