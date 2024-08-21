import heroesList from './heroesList.js';
import { state } from '../script.js';

const profilePicture = {
  render: (element) => {
    const image = document.createElement('img');
    image.className = 'profile-picture';
    image.id = 'profilePicture';
    image.src = `../${state.userProfilePicture}`;

    element.innerHTML = '';
    element.classList.remove('login-top');
    element.style.cursor = 'default';

    element.appendChild(image);
  },
};

export const changeProfilePicture = () => {
  const imageListGrid = document.getElementById('imageListGrid');

  if (!imageListGrid) {
    heroesList.render(document.getElementById('popupBottom'));
  }

  const img = document.getElementById('profilePicture');
  img.src = `../${state.userProfilePicture}`;
};

export default profilePicture;
