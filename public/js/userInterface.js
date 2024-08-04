import { loadHeroes, deleteHero, saveHero, searchHero } from './heroes.js';
import { login, register } from './auth.js';
import { shuffleImg, clearAttrIcons, allowOnlyNumbers } from './utilities.js';
import { state } from '../script.js';

const app = document.getElementById('app');

export function renderSideBar() {
  const sideBarContainer = document.createElement('div');
  sideBarContainer.className = 'sidebar-container';
  sideBarContainer.id = 'sideBarContainer';
  const mainContainer = document.getElementById('mainContainer');
  mainContainer.appendChild(sideBarContainer);
  renderControlsContainer();
  renderUserSectionContainer();
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

export function renderHomePage() {
  removeHomeElementsIfExist();
  setTimeout(() => {
    renderSearchContainer();
  }, 600);

  function removeHomeElementsIfExist() {
    state.tempHero = undefined;
    const heroPreviewContainer = document.getElementById('heroPreviewContainer');
    const searchContainer = document.getElementById('searchContainer');

    const elements = [heroPreviewContainer, searchContainer];

    elements.forEach((element) => {
      if (element) {
        element.style.animation = 'fadeOutBlur 500ms ease-out forwards';
        setTimeout(() => {
          app.removeChild(element);
        }, 550);
      }
    });
  }
}
// 👇    👇    SIDE CONTROLS    👇    👇
//
//
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

// 👇    👇    SEARCH BAR    👇    👇
//
//
function renderSearchContainer() {
  const searchContainer = document.createElement('div');
  searchContainer.className = 'search-container';
  searchContainer.id = 'searchContainer';
  app.appendChild(searchContainer);

  const searchBarContainer = document.createElement('div');
  searchBarContainer.className = 'search-bar-container';
  searchBarContainer.id = 'searchBarContainer';

  searchContainer.appendChild(searchBarContainer);

  const resultContainer = document.createElement('div');
  resultContainer.className = 'result-container';
  resultContainer.id = 'resultContainer';

  searchContainer.appendChild(resultContainer);

  renderSearchBar();
}

function renderSearchBar() {
  const searchBarContainer = document.getElementById('searchBarContainer');

  const searchBar = document.createElement('div');
  searchBar.className = 'search-bar';
  searchBar.id = 'searchBar';
  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'searchInput';
  input.autocomplete = 'off';
  input.placeholder = 'Search hero..';
  const icon = document.createElement('img');
  icon.src = './images/icons/search.svg';

  input.addEventListener('input', function () {
    if (input.value.trim() === '') {
      clearResult();
    } else {
      searchHero(input.value);
    }
  });
  searchBar.appendChild(input);
  searchBar.appendChild(icon);
  searchBarContainer.appendChild(searchBar);
}

export function clearResult() {
  const resultContainer = document.getElementById('resultContainer');
  const result = document.getElementById('result');
  if (result) {
    result.style.animation = 'fadeOutBlur 500ms ease-out forwards';
    setTimeout(() => {
      if (result && resultContainer.contains(result)) {
        resultContainer.removeChild(result);
      }
    }, 300);
  }
}

function renderPreviewContainer() {
  const heroPreviewContainer = document.createElement('div');
  heroPreviewContainer.className = 'hero-preview-container';
  heroPreviewContainer.id = 'heroPreviewContainer';
  app.appendChild(heroPreviewContainer);
}
// 👇    👇    HERO CARD    👇    👇
//
//
export function showHero(hero) {
  const heroCard = document.getElementById('heroCard');
  if (hero.name !== 'New Hero') {
    heroCard.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0.163), rgba(0, 0, 0, 0.585)), url(${hero.imageVert})`;
  }

  heroCard.classList.add('in-blur');
  renderInfoContainer();
  renderInfos(hero);
  renderAttributesContainer();
  renderAttributes(hero);
  renderMainAttr(hero);
  state.tempHero = {
    id: hero.id,
    name: hero.name,
    mainAttr: hero.mainAttr,
    agi: hero.agi,
    str: hero.str,
    intel: hero.intel,
    imageVert: hero.imageVert,
  };
}

function showHeroEditor() {
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

export function renderHeroCard() {
  const searchContainer = document.getElementById('searchContainer');
  if (searchContainer) {
    searchContainer.classList.add('out-blur');
  }

  renderPreviewContainer();
  const heroPreviewContainer = document.getElementById('heroPreviewContainer');
  const heroCard = document.createElement('div');
  heroCard.className = 'hero-card';
  heroCard.id = 'heroCard';
  heroPreviewContainer.appendChild(heroCard);
  renderShuffleButton();
}

function renderInfoContainer() {
  const infoContainer = document.createElement('div');
  infoContainer.className = 'info-container';
  infoContainer.id = 'infoContainer';
  const heroCard = document.getElementById('heroCard');
  heroCard.append(infoContainer);
}

function renderInfos(hero) {
  const heroName = document.createElement('div');
  heroName.className = 'hero-name';
  heroName.textContent = hero.name;
  heroName.contentEditable = 'true';
  const infoContainer = document.getElementById('infoContainer');
  infoContainer.appendChild(heroName);

  infoContainer.addEventListener('mouseleave', () => {
    if (document.activeElement === heroName) {
      heroName.blur();
    }
  });
}

function renderMainAttr(hero) {
  clearAttrIcons();
  const mainAttr = hero.mainAttr;
  let attrIcon;

  switch (mainAttr) {
    case 'str':
      attrIcon = document.getElementById('strengthIcon');
      break;
    case 'agi':
      attrIcon = document.getElementById('agilityIcon');
      break;
    case 'intel':
      attrIcon = document.getElementById('intelligenceIcon');
      break;

    default:
      return;
  }

  attrIcon.classList.add('selected-attribute');
}

function renderAttributesContainer() {
  const attributesContainer = document.createElement('div');
  attributesContainer.className = 'attributes-container';
  attributesContainer.id = 'attributesContainer';
  const heroCard = document.getElementById('heroCard');
  heroCard.appendChild(attributesContainer);
}

function renderAttributes(hero) {
  const attributesContainer = document.getElementById('attributesContainer');

  const attributesData = {
    agility: hero.agi,
    strength: hero.str,
    intelligence: hero.intel,
  };

  Object.keys(attributesData).forEach((attr) => {
    const attrRow = document.createElement('div');
    attrRow.className = 'attr-row';
    attrRow.id = 'attrRow';
    attributesContainer.appendChild(attrRow);

    const icon = document.createElement('img');
    icon.className = 'icon';
    icon.id = `${attr}Icon`;
    icon.src = `https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/icons/hero_${attr}.png`;
    attrRow.appendChild(icon);
    icon.addEventListener('click', () => {
      clearAttrIcons();
      icon.classList.add('selected-attribute');

      const attributeName = icon.id.replace(/Icon$/, '');

      const attributeMap = {
        agility: 'agi',
        strength: 'str',
        intelligence: 'intel',
      };

      state.tempHero = { ...state.tempHero, mainAttr: attributeMap[attributeName] };
    });

    const value = document.createElement('div');
    value.className = 'value';
    value.id = `${attr}Value`;
    value.contentEditable = 'true';
    value.textContent = attributesData[attr];
    attrRow.appendChild(value);
    heroCard.addEventListener('mouseleave', () => {
      if (document.activeElement === value) {
        value.blur();
      }
    });

    allowOnlyNumbers(value);
  });
}

function renderShuffleButton() {
  const heroCard = document.getElementById('heroCard');

  const shuffleButtonContainer = document.createElement('div');
  shuffleButtonContainer.className = 'shuffle-button-container';
  shuffleButtonContainer.id = 'shuffleButtonContainer';

  heroCard.append(shuffleButtonContainer);

  const shuffleIcon = document.createElement('img');
  shuffleIcon.src = './images/icons/shuffle.svg';
  shuffleButtonContainer.appendChild(shuffleIcon);
  shuffleIcon.addEventListener('click', function () {
    shuffleImg();
  });
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