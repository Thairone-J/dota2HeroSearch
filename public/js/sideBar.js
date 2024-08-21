import { state } from '../script.js';
import { deleteHero, saveHero, loadHeroes } from './heroes.js';
import { renderHomePage } from './homePage.js';
import { renderHeroCard, showHero } from './heroCard.js';
import loginPage from './loginPage.js';




const sideBar = {
  renderSideBar: () => {
    const sideBarContainer = document.createElement('div');
    sideBarContainer.className = 'sidebar-container';
    sideBarContainer.id = 'sideBarContainer';
    const mainContainer = document.getElementById('mainContainer');
    mainContainer.appendChild(sideBarContainer);
    renderControlsContainer();
    renderUserSectionContainer();
  },
};

function renderControlsContainer() {
  const sideBarContainer = document.getElementById('sideBarContainer');
  const controlsContainer = document.createElement('div');
  controlsContainer.className = 'controls-container';
  controlsContainer.id = 'controlsContainer';
  sideBarContainer.appendChild(controlsContainer);
  renderHomeButton();
  renderCreateHeroButton();
  renderSaveButton();
  renderDeleteButton();
}

function renderHomeButton() {
  const controlsContainer = document.getElementById('controlsContainer');
  const homeButtonContainer = document.createElement('div');
  homeButtonContainer.className = 'control-button';
  homeButtonContainer.id = 'homeButtonContainer';
  const homeSearchIcon = document.createElement('img');
  homeSearchIcon.src = './images/icons/search.svg';
  homeButtonContainer.appendChild(homeSearchIcon);
  homeButtonContainer.addEventListener('click', function () {
    renderHomePage();
  });
  controlsContainer.appendChild(homeButtonContainer);
}

function renderCreateHeroButton() {
  const controlsContainer = document.getElementById('controlsContainer');
  const createHeroButton = document.createElement('div');
  createHeroButton.className = 'control-button';
  createHeroButton.id = 'createHeroButton';
  const icon = document.createElement('img');
  icon.src = './images/icons/add.svg';
  createHeroButton.appendChild(icon);

  controlsContainer.appendChild(createHeroButton);
  createHeroButton.addEventListener('click', function () {
    renderHeroEditor();
  });
}

function renderHeroEditor() {
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

function renderSaveButton() {
  const saveButtonContainer = document.createElement('div');
  saveButtonContainer.className = 'control-button';
  saveButtonContainer.id = 'saveButtonContainer';
  const saveIcon = document.createElement('img');
  saveIcon.src = './images/icons/save.svg';
  saveButtonContainer.appendChild(saveIcon);
  saveButtonContainer.addEventListener('click', () => {
    saveHero();
  });
  const controlsContainer = document.getElementById('controlsContainer');
  controlsContainer.appendChild(saveButtonContainer);
}

function renderDeletePopUp() {
  if (!state.tmpHero || state.tmpHero.name === 'New Hero') {
    return;
  }

  const body = document.body;

  const fadeBlackScreen = document.createElement('div');
  fadeBlackScreen.className = 'fade-black-screen';
  fadeBlackScreen.id = 'fadeBlackScreen';
  const deletePopUp = document.createElement('div');
  deletePopUp.className = 'delete-popup';
  deletePopUp.id = 'deletePopUp';
  body.appendChild(fadeBlackScreen);
  fadeBlackScreen.appendChild(deletePopUp);
  const heroImg = document.createElement('div');
  heroImg.className = 'hero-img';
  heroImg.style.backgroundImage = `url(${state.tmpHero.imageVert})`;
  heroImg.style.backgroundSize = 'cover';
  const msgContainer = document.createElement('div');
  msgContainer.className = 'msg-container';
  const message = document.createElement('p');
  message.textContent = `Delete ${state.tmpHero.name}?`;
  msgContainer.appendChild(message);

  deletePopUp.appendChild(msgContainer);

  deletePopUp.appendChild(heroImg);

  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'buttons-container';

  const confirmButton = document.createElement('div');
  confirmButton.className = 'confirm-button';
  const cancelButton = document.createElement('div');
  cancelButton.className = 'cancel-button';
  cancelButton.textContent = 'No, thanks';
  confirmButton.textContent = 'DELETE';

  confirmButton.addEventListener('click', () => {
    body.removeChild(fadeBlackScreen);
    deleteHero();
  });

  cancelButton.addEventListener('click', () => {
    body.removeChild(fadeBlackScreen);
  });

  buttonsContainer.append(cancelButton, confirmButton);
  deletePopUp.appendChild(buttonsContainer);
}

function renderDeleteButton() {
  const controlsContainer = document.getElementById('controlsContainer');
  const deleteButtonContainer = document.createElement('div');
  deleteButtonContainer.className = 'control-button';
  const deleteIcon = document.createElement('img');
  deleteIcon.src = './images/icons/delete.svg';
  deleteButtonContainer.appendChild(deleteIcon);
  deleteButtonContainer.addEventListener('click', () => {
    renderDeletePopUp();
  });
  controlsContainer.appendChild(deleteButtonContainer);
}

function renderUserSectionContainer() {
  const sideBarContainer = document.getElementById('sideBarContainer');
  const userSectionContainer = document.createElement('div');
  userSectionContainer.className = 'user-section-container';
  userSectionContainer.id = 'userSectionContainer';
  sideBarContainer.appendChild(userSectionContainer);
  renderHeroesListButton();
}

function renderUserPicture() {
  const userPictureContainer = document.createElement('div');
  const userPicture = document.createElement('img');
  userPicture.className = 'user-picture';
  userPicture.id = 'userPicture';
  userPictureContainer.className = 'user-picture-container';
  userPictureContainer.id = 'userPictureContainer';
  userPictureContainer.appendChild(userPicture);
  const userSection = document.getElementById('userSectionContainer');
  userSection.appendChild(userPictureContainer);
}

function renderHeroesListButton() {
  const heroesListButtonContainer = document.createElement('div');
  heroesListButtonContainer.className = ' heroes-list-button-container';
  heroesListButtonContainer.id = 'heroesListButtonContainer';
  const listIcon = document.createElement('img');
  listIcon.src = './images/icons/menu.svg';
  listIcon.className = 'list-icon';
  listIcon.id = 'listIcon';

  const spinIcon = document.createElement('img');
  spinIcon.src = './images/icons/spin_arrow.svg';
  spinIcon.className = 'spin-icon';
  spinIcon.id = 'spinIcon';

  const checkIcon = document.createElement('img');
  checkIcon.src = './images/icons/check.svg';
  checkIcon.className = 'check-icon';
  checkIcon.id = 'checkIcon';

  heroesListButtonContainer.append(listIcon, spinIcon, checkIcon);

  heroesListButtonContainer.addEventListener('click', () => {
    loginPage.render();


    // alert('renderUserPicture()')
    // renderUserPicture();
  });

  const userSection = document.getElementById('userSectionContainer');
  userSection.appendChild(heroesListButtonContainer);
}

export default sideBar;
