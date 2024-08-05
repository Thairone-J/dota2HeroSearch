import { state } from '../script.js';
import { deleteHero, saveHero } from './heroes.js';
import { renderHomePage, showHeroEditor } from './userInterface.js';

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
  const homeIcon = document.createElement('img');
  homeIcon.src = './images/icons/home.svg';
  homeButtonContainer.appendChild(homeIcon);
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
    showHeroEditor();
  });
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
  if (!state.tempHero || state.tempHero.name === 'New Hero') {
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
  heroImg.style.backgroundImage = `url(${state.tempHero.imageVert})`;
  heroImg.style.backgroundSize = 'cover';
  const msgContainer = document.createElement('div');
  msgContainer.className = 'msg-container';
  const message = document.createElement('p');
  message.textContent = `Delete ${state.tempHero.name}?`;
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
  renderUserPicture();
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
    renderLoginContainer();
  });

  const userSection = document.getElementById('userSectionContainer');
  userSection.appendChild(heroesListButtonContainer);
}

function renderLoginContainer() {
  const loginContainer = document.getElementById('loginContainer');

  if (loginContainer) {
    loginContainer.remove();
    return;
  }

  const token = localStorage.getItem('token');

  const newLoginContainer = document.createElement('div');
  newLoginContainer.className = 'login-container';
  newLoginContainer.id = 'loginContainer';

  const mainContainer = document.getElementById('mainContainer');
  const inputContainer = document.createElement('div');
  inputContainer.className = 'input-container';
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'buttons-container';
  buttonsContainer.id = 'buttonsContainer';

  mainContainer.append(newLoginContainer);
  newLoginContainer.append(inputContainer, buttonsContainer);

  if (!token) {
    const loginInput = document.createElement('input');
    loginInput.id = 'loginInput';
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'passwordInput';
    inputContainer.append(loginInput, passwordInput);

    const loginButton = document.createElement('div');
    loginButton.className = 'login-button';
    loginButton.id = 'loginButton';
    loginButton.textContent = 'Login';
    loginButton.addEventListener('click', () => {
      const username = document.getElementById('loginInput').value.toLowerCase();
      const password = document.getElementById('passwordInput').value;

      login(username, password);
    });

    const signInButton = document.createElement('div');
    signInButton.className = 'signin-button';
    signInButton.id = 'signInButton';
    signInButton.textContent = 'Sign in';
    signInButton.addEventListener('click', () => {
      const username = document.getElementById('loginInput').value.toLowerCase();
      const password = document.getElementById('passwordInput').value;

      register(username, password);
    });

    buttonsContainer.append(loginButton, signInButton);
  } else {
    const userPicture = document.createElement('div');
    userPicture.className = 'user-picture';
    const myHeroesButton = document.createElement('div');
    myHeroesButton.textContent = 'My Heroes';
    inputContainer.appendChild(userPicture);
    buttonsContainer.appendChild(myHeroesButton);
  }
}

export default sideBar;
