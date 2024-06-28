let defaultHeroList = [];
let currentHero;
let heroesDataAvaible = false;
console.info('Heroes data is avaible: ' + heroesDataAvaible);

const app = document.getElementById('app');

document.addEventListener('DOMContentLoaded', function () {
  renderHomePage();
});

function renderHomePage() {
  removeHomeElementsIfExist();
  renderPreviewContainer();
  renderHeroEditorButton();
  renderSearchBar();

  function removeHomeElementsIfExist() {
    const previewContainer = document.getElementById('heroPreviewContainer');
    const editorButton = document.getElementById('heroEditorButton');
    const searchBar = document.getElementById('searchBar');

    if (previewContainer && editorButton) {
      previewContainer.removeChild(editorButton);
      app.removeChild(previewContainer);
    }
    if (searchBar) {
      app.removeChild(searchBar);
    }
  }
}
function renderPreviewContainer() {
  const heroPreviewContainer = document.createElement('div');
  heroPreviewContainer.className = 'hero-preview-container';
  heroPreviewContainer.id = 'heroPreviewContainer';
  app.appendChild(heroPreviewContainer);
}

function renderHeroEditorButton() {
  const heroEditorButton = document.createElement('div');
  heroEditorButton.className = 'hero-editor-button';
  heroEditorButton.id = 'heroEditorButton';
  const icon = document.createElement('i');
  icon.className = 'material-icons';
  icon.textContent = 'add';
  heroEditorButton.appendChild(icon);
  const heroPreviewContainer = document.getElementById('heroPreviewContainer');

  heroPreviewContainer.appendChild(heroEditorButton);
  heroEditorButton.addEventListener('click', function () {
    showHeroEditor();
  });
}








function renderSearchBar() {
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
    if (searchInput.value < 1) {
      const searchPreview = document.getElementById('searchPreview');
      if (searchPreview) {
        searchPreview.style.animation = 'fadeOut 300ms';
      }
      setTimeout(() => {
        const heroPreviewContainer = document.getElementById('heroPreviewContainer');
        heroPreviewContainer.removeChild(searchPreview);
      }, 350);
    }
    searchHero(searchInput.value);
  });

  searchBar.appendChild(input);
  searchBar.appendChild(icon);
  app.appendChild(searchBar);
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
  renderHeroCard();
  showHero();
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
    renderSearchPreview();
    showResultData(currentHero);
  }
}

function renderSearchPreview() {
  let searchPreview = document.getElementById('searchPreview');

  if (!searchPreview) {
    const heroEditorButton = document.getElementById('heroEditorButton');
    heroEditorButton.style.display = 'none';

    searchPreview = document.createElement('div');
    searchPreview.id = 'searchPreview';
    searchPreview.className = 'search-preview';
    const heroPreviewContainer = document.getElementById('heroPreviewContainer');
    heroPreviewContainer.appendChild(searchPreview);
    renderResult();
  }
}

function renderResult() {
  const searchPreview = document.getElementById('searchPreview');
  const result = document.createElement('div');
  result.className = 'result';
  result.id = 'result';

  searchPreview.appendChild(result);

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
}

function showResultData(result) {
  const resultTitle = document.getElementById('resultTitle');
  resultTitle.textContent = result.name;
  const resultImage = document.getElementById('resultPicture');
  resultImage.style.backgroundImage = `url(${result.imageUrl})`;
  resultImage.style.backgroundPosition = 'center';
  resultImage.style.backgroundSize = '110%';
  resultImage.style.backgroundRepeat = 'no-repeat';
}

function renderHeroCard() {
  const heroCard = document.createElement('div');
  heroCard.className = 'hero-card';
  heroCard.id = 'heroCard';

  const searchPreview = document.getElementById('searchPreview');

  const elements = [searchPreview, searchBar, heroEditorButton];

  elements.forEach((element) => {
    if (element) {
      element.style.display = 'none';
    }
  });
  const heroPreviewContainer = document.getElementById('heroPreviewContainer');
  heroPreviewContainer.appendChild(heroCard);
  // renderSkills();
  renderReturnButton();
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

function renderReturnButton() {
  const returnContainer = document.createElement('div');
  returnContainer.className = 'return-container';
  returnContainer.id = 'returnContainer';
  const heroPreviewContainer = document.getElementById('heroPreviewContainer');
  const app = document.getElementById('app');
  app.insertBefore(returnContainer, heroPreviewContainer);
  const returnIcon = document.createElement('i');
  returnIcon.className = 'return-button material-icons';
  returnIcon.textContent = 'home';
  returnContainer.appendChild(returnIcon);
  returnContainer.addEventListener('click', function () {
    const heroCard = document.getElementById('heroCard');
    heroPreviewContainer.removeChild(heroCard);
    app.removeChild(returnContainer);
    renderHomePage();
  });
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
