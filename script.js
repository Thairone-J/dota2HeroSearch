let defaultHeroList = [];
let heroesDataAvaible = false;
let tempHero;
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
    tempHero = undefined;
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
  defaultHeroList = undefined;
  try {
    const response = await fetch('http://localhost:3000/heroes');
    const heroes = await response.json();
    console.info('Heroes data has been requested');
    defaultHeroList = heroes.map((hero) => ({
      id: hero.id,
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

function showHero(hero) {
  const heroCard = document.getElementById('heroCard');
  if (hero.name !== 'New Hero') {
    heroCard.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0.163), rgba(0, 0, 0, 0.585)), url(${hero.imageUrl})`;
  }
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
    imageUrl: hero.imageUrl,
  };
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
      tempHero = { ...tempHero, mainAttr: attributeName };
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

  const shuffleContainer = document.createElement('div');
  shuffleContainer.className = 'shuffle-container';
  shuffleContainer.id = 'shuffleContainer';

  heroCard.append(shuffleContainer);

  const heroShuffleIcon = document.createElement('i');
  heroShuffleIcon.className = 'hero-shuffle-icon material-icons shuffle';
  heroShuffleIcon.textContent = 'shuffle';
  shuffleContainer.append(heroShuffleIcon);
  heroShuffleIcon.addEventListener('click', function () {
    shuffleImg();
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
  renderSaveButtonContainer();
}

function renderSaveButtonContainer() {
  const saveButtonContainer = document.createElement('div');
  saveButtonContainer.className = 'save-button-container';
  saveButtonContainer.id = 'saveButtonContainer';
  const saveIcon = document.createElement('i');
  saveIcon.className = 'material-icons';
  saveIcon.textContent = 'save';
  saveButtonContainer.appendChild(saveIcon);
  saveButtonContainer.addEventListener('click', () => {
    saveHero();
  });
  const controlsContainer = document.getElementById('controlsContainer');
  controlsContainer.appendChild(saveButtonContainer);
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

function shuffleImg() {
  const imgUrl = defaultHeroList[Math.floor(Math.random() * defaultHeroList.length)].imageUrl;
  tempHero = { ...tempHero, imageUrl: imgUrl };
  updateImgBg(imgUrl);
}

function updateImgBg(imgUrl) {
  const heroCard = document.getElementById('heroCard');
  heroCard.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0.163), rgba(0, 0, 0, 0.585)), url(${imgUrl})`;
}

function clearAttrIcons() {
  const icons = document.querySelectorAll('#strengthIcon, #agilityIcon, #intelligenceIcon');
  icons.forEach((icon) => {
    icon.classList.remove('selected-attribute');
  });
}

function allowOnlyNumbers(element) {
  element.addEventListener('input', function (e) {
    let content = e.target.innerText.replace(/\D/g, '').slice(0, 2);
    if (content === '' || content === '00') {
      content = '0';
    }
    e.target.innerText = content;
  });
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
      image_url: tempHero.imageUrl,
    };

    function idExists(set, id) {
      return set.has(id);
    }
    const heroesIds = new Set(defaultHeroList.map((item) => item.id));
    const heroExists = idExists(heroesIds, hero.id);
    if (heroExists) {
      updateHero(hero);
      return;
    }

    if (
      !hero.main_attr ||
      hero.agi === 0 ||
      hero.str === 0 ||
      hero.intel === 0 ||
      !hero.image_url
    ) {
      alert('image, attributes and main attribute are required to create a new Hero!');
      return;
    }

    loadHeroes();

    renderHomePage();
  }
  alert('No Hero to save here..');
}

async function updateHero(hero) {
  try {
    const response = await fetch('http://localhost:3000/heroes', {
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
    const response = await fetch('http://localhost:3000/heroes', {
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
