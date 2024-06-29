let defaultHeroList = [];
let currentHero;
let heroesDataAvaible = false;
console.info('Heroes data is avaible: ' + heroesDataAvaible);

const app = document.getElementById('app');

document.addEventListener('DOMContentLoaded', function () {
  renderControlsContainer();
  renderHomePage();
});

function renderHomePage() {
  removeHomeElementsIfExist();
  renderSearchContainer();

  function removeHomeElementsIfExist() {
    const heroPreviewContainer = document.getElementById('heroPreviewContainer');
    const searchContainer = document.getElementById('searchContainer');

    const elements = [heroPreviewContainer, searchContainer];

    elements.forEach((element) => {
      if (element) {
        app.removeChild(element);
      }
    });
  }
}
function renderPreviewContainer() {
  const heroPreviewContainer = document.createElement('div');
  heroPreviewContainer.className = 'hero-preview-container';
  heroPreviewContainer.id = 'heroPreviewContainer';
  app.appendChild(heroPreviewContainer);
}

function renderHeroEditorButton() {
  const controlsContainer = document.getElementById('controlsContainer');
  const heroEditorButton = document.createElement('div');
  heroEditorButton.className = 'hero-editor-button';
  heroEditorButton.id = 'heroEditorButton';
  const icon = document.createElement('i');
  icon.className = 'material-icons';
  icon.textContent = 'add';
  heroEditorButton.appendChild(icon);

  controlsContainer.appendChild(heroEditorButton);
  heroEditorButton.addEventListener('click', function () {
    showHeroEditor();
  });
}

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
  const icon = document.createElement('i');
  icon.className = 'material-icons';
  icon.id = 'searchButton';
  icon.textContent = 'search';

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

async function loadHeroes() {
  try {
    const response = await fetch('http://localhost:3000/heroes');
    const heroes = await response.json();
    console.info('Heroes data has been requested');
    defaultHeroList = heroes.map((hero) => ({
      name: hero.name,
      mainAttr: hero.main_attr,
      agi: hero.agi,
      str: hero.str,
      intel: hero.intel,
      imageUrl: hero.image_url,
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

function showHero() {
  const heroCard = document.getElementById('heroCard');
  if (currentHero.name !== 'New Hero') {
    heroCard.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0.163), rgba(0, 0, 0, 0.585)), url(${currentHero.imageUrl})`;
  }
  renderInfoContainer();
  renderInfos();
  renderAttributesContainer();
  renderAttributes();
  renderMainAttr();
}

function renderMainAttr() {
  clearAttrIcons();
  const mainAttr = currentHero.mainAttr;
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

  attrIcon.style.borderWidth = '3px';
  attrIcon.style.borderColor = 'white';
  attrIcon.style.borderStyle = 'solid';
  attrIcon.style.borderRadius = '100%';
}

function showHeroEditor() {
  if (!heroesDataAvaible) {
    loadHeroes();
  }

  const emptyHero = { name: 'New Hero', mainAttr: undefined, agi: 0, str: 0, intel: 0 };
  currentHero = emptyHero;
  const heroPreviewContainer = document.getElementById('heroPreviewContainer');
  if (!heroPreviewContainer) {
    renderHeroCard();
    showHero();
  }
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
    currentHero = result;
    renderResult(currentHero);
  } else {
    clearResult();
  }
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

    result.addEventListener('click', function () {
      renderHeroCard();
      showHero();
    });

    resultContainer.appendChild(result);
  }

  updateResultData(hero);
}

function updateResultData(hero) {
  const resultTitle = document.getElementById('resultTitle');
  resultTitle.textContent = hero.name;
  const resultImage = document.getElementById('resultPicture');
  resultImage.style.backgroundImage = `url(${hero.imageUrl})`;
  resultImage.style.backgroundPosition = 'center';
  resultImage.style.backgroundSize = '110%';
  resultImage.style.backgroundRepeat = 'no-repeat';
}

function clearResult() {
  const resultContainer = document.getElementById('resultContainer');
  const result = document.getElementById('result');
  if (result) {
    result.style.animation = 'fadeOut 300ms ease-out forwards';
    setTimeout(() => {
      if (result && resultContainer.contains(result)) {
        resultContainer.removeChild(result);
      }
    }, 300);
  }
}

function renderHeroCard() {
  renderPreviewContainer();
  const heroCard = document.createElement('div');
  heroCard.className = 'hero-card';
  heroCard.id = 'heroCard';

  const searchContainer = document.getElementById('searchContainer');

  const elements = [searchContainer];

  elements.forEach((element) => {
    if (element) {
      element.style.display = 'none';
    }
  });
  const heroPreviewContainer = document.getElementById('heroPreviewContainer');
  heroPreviewContainer.appendChild(heroCard);
  // renderSkills();
  //renderReturnButton();
  renderShuffleButton();
}

function renderInfoContainer() {
  const infoContainer = document.createElement('div');
  infoContainer.className = 'info-container';
  infoContainer.id = 'infoContainer';
  const heroCard = document.getElementById('heroCard');
  heroCard.append(infoContainer);
}

function renderInfos() {
  const heroName = document.createElement('div');
  heroName.className = 'hero-name';
  heroName.textContent = currentHero.name;
  heroName.contentEditable = 'true';
  const infoContainer = document.getElementById('infoContainer');
  infoContainer.appendChild(heroName);

  infoContainer.addEventListener('mouseleave', () => {
    if (document.activeElement === heroName) {
      heroName.blur();
    }
  });
}

function renderAttributesContainer() {
  const attributesContainer = document.createElement('div');
  attributesContainer.className = 'attributes-container';
  attributesContainer.id = 'attributesContainer';
  const heroCard = document.getElementById('heroCard');
  heroCard.appendChild(attributesContainer);
}

function renderAttributes() {
  const attributesContainer = document.getElementById('attributesContainer');

  const AttributesData = {
    agility: currentHero.agi,
    strength: currentHero.str,
    intelligence: currentHero.intel,
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

  const shuffleContainer = document.createElement('div');
  shuffleContainer.className = 'shuffle-container';
  shuffleContainer.id = 'shuffleContainer';

  heroCard.append(shuffleContainer);

  const heroShuffleIcon = document.createElement('i');
  heroShuffleIcon.className = 'hero-shuffle-icon material-icons shuffle';
  heroShuffleIcon.textContent = 'shuffle';
  shuffleContainer.append(heroShuffleIcon);
  heroShuffleIcon.addEventListener('click', function () {
    shuffleImg(currentHero);
  });
}

function renderControlsContainer() {
  const mainContainer = document.getElementById('mainContainer');
  const controlsContainer = document.createElement('div');
  controlsContainer.className = 'controls-container';
  controlsContainer.id = 'controlsContainer';
  mainContainer.appendChild(controlsContainer);
  renderReturnButton();
  renderHeroEditorButton();
}

function renderReturnButton() {
  const controlsContainer = document.getElementById('controlsContainer');
  const returnContainer = document.createElement('div');
  returnContainer.className = 'return-container';
  returnContainer.id = 'returnContainer';
  const returnIcon = document.createElement('i');
  returnIcon.className = 'return-button material-icons';
  returnIcon.textContent = 'home';
  returnContainer.appendChild(returnIcon);
  returnContainer.addEventListener('click', function () {
    renderHomePage();
  });
  controlsContainer.appendChild(returnContainer);
}

function shuffleImg(hero) {
  const randomImg = defaultHeroList[Math.floor(Math.random() * defaultHeroList.length)].imageUrl;
  hero.imageUrl = randomImg;
  updateImgBg();
}

function updateImgBg() {
  heroCard.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0.163), rgba(0, 0, 0, 0.585)), url(${currentHero.imageUrl})`;
}
function clearAttrIcons() {
  const icons = document.querySelectorAll('#strengthIcon, #agilityIcon, #intelligenceIcon');
  icons.forEach((icon) => {
    icon.style.borderWidth = '';
    icon.style.borderColor = '';
    icon.style.borderStyle = '';
    icon.style.borderRadius = '';
  });
}

function allowOnlyNumbers(element) {
  element.addEventListener('keydown', function (event) {
    const key = event.key;
    const content = element.textContent;

    if (
      ['Backspace', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Delete', 'Tab'].includes(
        key
      )
    ) {
      return;
    }

    if (!/^\d$/.test(key) || content.length >= 2) {
      event.preventDefault();
    }
  });

  element.addEventListener('input', function () {
    let value = element.textContent.replace(/[^\d]/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2);
    }
    if (value === '') {
      value = '0';
    }
    element.textContent = value;
  });

  if (!/^\d{1,2}$/.test(element.textContent)) {
    element.textContent = '0';
  }
}
