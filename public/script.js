let defaultHeroList = [];
let heroesDataAvaible = false;
let tempHero;
const BASE_URL = 'http://localhost:3000';
console.info('Heroes data is avaible: ' + heroesDataAvaible);

const app = document.getElementById('app');

document.addEventListener('DOMContentLoaded', function () {
  renderSideBar();
  renderHomePage();
});

function renderSideBar() {
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
  const icon = document.createElement('img');
  icon.src = './images/icons/menu.svg';
  heroesListButtonContainer.appendChild(icon)

  const userSection = document.getElementById('userSectionContainer');
  userSection.appendChild(heroesListButtonContainer);
}

function renderHomePage() {
  removeHomeElementsIfExist();
  setTimeout(() => {
    renderSearchContainer();
  }, 600);

  function removeHomeElementsIfExist() {
    tempHero = undefined;
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

function renderDeleteButton() {
  const controlsContainer = document.getElementById('controlsContainer');
  const deleteButtonContainer = document.createElement('div');
  deleteButtonContainer.className = 'control-button';
  const deleteIcon = document.createElement('img');
  deleteIcon.src = './images/icons/delete.svg';
  deleteButtonContainer.appendChild(deleteIcon);
  deleteButtonContainer.addEventListener('click', () => {
    deleteHero();
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

function renderResult(hero) {
  const resultContainer = document.getElementById('resultContainer');
  let result = document.getElementById('result');

  if (!result) {
    result = document.createElement('div');
    result.className = 'result';
    result.id = 'result';

    const resultPictureSection = document.createElement('div');
    resultPictureSection.className = 'result-picture-section';
    result.appendChild(resultPictureSection);

    const resultPicture = document.createElement('div');
    resultPicture.className = 'result-picture';
    resultPicture.id = 'resultPicture';
    resultPictureSection.appendChild(resultPicture);

    const resultTitleSection = document.createElement('div');
    resultTitleSection.className = 'result-title-section';
    result.appendChild(resultTitleSection);

    const resultTitle = document.createElement('div');
    resultTitle.id = 'resultTitle';
    resultTitle.className = 'result-title';
    resultTitleSection.appendChild(resultTitle);

    resultContainer.appendChild(result);
  }

  updateResultData(hero);
  result.onclick = function () {
    renderHeroCard();
    showHero(hero);
  };
}

function updateResultData(hero) {
  const resultTitle = document.getElementById('resultTitle');
  resultTitle.textContent = hero.name;
  const resultImage = document.getElementById('resultPicture');
  resultImage.style.backgroundImage = `url(${hero.imageVert})`;
  resultImage.style.backgroundPosition = 'center';
  resultImage.style.backgroundSize = '110%';
  resultImage.style.backgroundRepeat = 'no-repeat';
}

function clearResult() {
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
function showHero(hero) {
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
  tempHero = {
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
  if (!heroesDataAvaible) {
    loadHeroes();
  }

  const emptyHero = { name: 'New Hero', mainAttr: undefined, agi: 0, str: 0, intel: 0 };

  const heroPreviewContainer = document.getElementById('heroPreviewContainer');
  if (!heroPreviewContainer) {
    renderHeroCard();
    showHero(emptyHero);
  }
}

function renderHeroCard() {
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

  const AttributesData = {
    agility: hero.agi,
    strength: hero.str,
    intelligence: hero.intel,
  };

  Object.keys(AttributesData).forEach((attr) => {
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

      tempHero = { ...tempHero, mainAttr: attributeMap[attributeName] };
    });

    const value = document.createElement('div');
    value.className = 'value';
    value.id = `${attr}Value`;
    value.contentEditable = 'true';
    value.textContent = AttributesData[attr];
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

function searchHero(queryHero) {
  if (!heroesDataAvaible) {
    loadHeroes();
    return;
  }
  let result = defaultHeroList.find((hero) =>
    hero.name.toLowerCase().startsWith(queryHero.toLowerCase())
  );
  if (result) {
    renderResult(result);
  } else {
    clearResult();
  }
}
// 👇    👇    CRUD   👇    👇
//
//
async function loadHeroes() {
  defaultHeroList = undefined;
  try {
    const response = await fetch(`${BASE_URL}/heroes`);
    const heroes = await response.json();
    console.info('Heroes data has been requested');
    defaultHeroList = heroes.map((hero) => ({
      id: hero.id,
      name: hero.name,
      mainAttr: hero.main_attr,
      agi: hero.agi,
      str: hero.str,
      intel: hero.intel,
      imageVert: hero.image_vert,
    }));

    if (defaultHeroList.length > 0) {
      heroesDataAvaible = true;
      console.info('Heroes data is avaible: ' + heroesDataAvaible);
    } else {
      console.info('Heroes data was requested but not stored.');
    }
  } catch (error) {
    console.error('Erro ao buscar os heróis: ', error);
  }
}

async function saveHero() {
  if (tempHero) {
    getInputs();
    const hero = {
      id: tempHero.id,
      name: tempHero.name,
      main_attr: tempHero.mainAttr,
      agi: tempHero.agi,
      str: tempHero.str,
      intel: tempHero.intel,
      image_vert: tempHero.imageVert,
    };

    function idExists(set, id) {
      return set.has(id);
    }
    const heroesIds = new Set(defaultHeroList.map((item) => item.id));
    const heroExists = idExists(heroesIds, hero.id);
    if (heroExists) {
      await updateHero(hero);
      renderHomePage();

      loadHeroes();
      return;
    }

    if (
      !hero.main_attr ||
      hero.agi === 0 ||
      hero.str === 0 ||
      hero.intel === 0 ||
      !hero.image_vert
    ) {
      alert('image, attributes and main attribute are required to create a new Hero!');
      return;
    }

    await saveNewHero(hero);
    renderHomePage();

    loadHeroes();
  }
}

async function updateHero(hero) {
  try {
    const response = await fetch(`${BASE_URL}/heroes`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hero),
    });

    const data = await response.text();
    console.info(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function saveNewHero(hero) {
  try {
    const response = await fetch(`${BASE_URL}/heroes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hero),
    });

    const data = await response.text();
    console.info(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function deleteHero() {
  if (tempHero && tempHero.id) {
    try {
      const response = await fetch(`${BASE_URL}/heroes`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: tempHero.id }),
      });

      const data = await response.text();
      console.info(data);
      renderHomePage();
      loadHeroes();
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

// 👇    👇    UTILITY   👇    👇
//
//
function shuffleImg() {
  const imgVert = defaultHeroList[Math.floor(Math.random() * defaultHeroList.length)].imageVert;
  tempHero = { ...tempHero, imageVert: imgVert };
  updateImgBg(imgVert);
}

function updateImgBg(img) {
  const heroCard = document.getElementById('heroCard');
  heroCard.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0.163), rgba(0, 0, 0, 0.585)), url(${img})`;
}

function clearAttrIcons() {
  const icons = document.querySelectorAll('#strengthIcon, #agilityIcon, #intelligenceIcon');
  icons.forEach((icon) => {
    icon.classList.remove('selected-attribute');
  });
}

function allowOnlyNumbers(element) {
  element.addEventListener('input', function (e) {
    let content = e.target.innerText.replace(/\D/g, '');

    content = content === '' ? '0' : content.slice(-2);

    e.target.innerText = content;

    document.getSelection().collapse(e.target, 1);
  });
}

function getInputs() {
  const heroPreviewContainer = document.getElementById('heroPreviewContainer');

  if (heroPreviewContainer) {
    tempHero = {
      ...tempHero,
      name: document.querySelector('.hero-name').textContent,
      agi: parseInt(document.getElementById('agilityValue').textContent, 10) || 0,
      str: parseInt(document.getElementById('strengthValue').textContent, 10) || 0,
      intel: parseInt(document.getElementById('intelligenceValue').textContent, 10) || 0,
    };
  }
}
//
//
