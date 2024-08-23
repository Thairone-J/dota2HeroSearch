import heroesList from './heroesList.js';
import { state } from '../script.js';
import form from './form.js';

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

export const chooseProfilePicture = () => {
  const imageListGrid = document.getElementById('imageListGrid');

  if (!imageListGrid) {
    const yesIcon = document.createElement('img');
    yesIcon.src = '../images/icons/yes_check.svg';
    const noIcon = document.createElement('img');
    noIcon.src = '../images/icons/xclose.svg';
    const popupTop = document.getElementById('popupTop');
    const popupBottom = document.getElementById('popupBottom');
    const actionBtnsContainer = document.createElement('div');
    actionBtnsContainer.className = 'action-btns-container';
    actionBtnsContainer.id = 'actionBtnsContainer';

    yesIcon.addEventListener('click', () => {
      form.render(popupBottom, 'REGISTER');
      actionBtnsContainer.remove();
    });

    noIcon.addEventListener('click', () => {
      state.userProfilePicture = 'images/default_pp.jpg';
      profilePicture.render(popupTop);
      form.render(popupBottom, 'REGISTER');
      actionBtnsContainer.remove();
    });

    actionBtnsContainer.append(yesIcon, noIcon);
    popupTop.appendChild(actionBtnsContainer);

    heroesList.render(document.getElementById('popupBottom'));
  }

  const img = document.getElementById('profilePicture');
  img.src = `../${state.userProfilePicture}`;
};

export default profilePicture;
