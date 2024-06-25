const showHeroEditorButton = document.getElementById('showHeroEditorButton');
const heroPreviewContainer = document.getElementById('heroPreviewContainer');
const searchBar = document.getElementById('searchBar');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
let defaultHeroList = [];
let currentHero;
let heroesDataAvaible = false;
console.info('Heroes data is avaible: ' + heroesDataAvaible);

searchInput.addEventListener('input', function () {
  if (searchInput.value < 1) {
    const searchPreview = document.getElementById('searchPreview');
    if (searchPreview) {
      searchPreview.style.animation = 'fadeOut 300ms';
    }
    setTimeout(() => {
      heroPreviewContainer.removeChild(searchPreview);
    }, 350);
  }
  searchHero(searchInput.value);
});

searchButton.addEventListener('click', function () {
  searchHero(searchInput.value);
});

showHeroEditorButton.addEventListener('click', function () {
  showHeroEditor();
});

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
  heroCard.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0.163), rgba(0, 0, 0, 0.585)), url(${currentHero.imageUrl})`;
  const heroMainAttr = document.querySelector(`.${currentHero.mainAttr}`);
  heroMainAttr.style.borderWidth = '3px';
  heroMainAttr.style.borderColor = 'white';
  heroMainAttr.style.borderStyle = 'solid';
}

function showHeroEditor() {
  renderHeroCard();
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
    showHeroEditorButton.style.display = 'none';

    searchPreview = document.createElement('div');
    searchPreview.id = 'searchPreview';
    searchPreview.className = 'search-preview';
    heroPreviewContainer.appendChild(searchPreview);
    renderResult();
  }
}

function renderHeroCard() {
  const heroCard = document.createElement('div');
  heroCard.className = 'hero-card';
  heroCard.id = 'heroCard';

  const searchPreview = document.getElementById('searchPreview');

  const elements = [searchPreview, searchBar, showHeroEditorButton];

  elements.forEach((element) => {
    if (element) {
      element.style.display = 'none';
    }
  });

  heroPreviewContainer.appendChild(heroCard);
  // renderSkills();
  renderShuffleButton();

  renderAttributesContainer();
  renderAttributes();
  showAttributesValues();
}

function renderAttributes() {
  const attributesContainer = document.getElementById('attributesContainer');
  const heroAttributes = document.createElement('div');
  heroAttributes.className = 'hero-attributes';
  heroAttributes.id = 'heroAttributes';
  attributesContainer.appendChild(heroAttributes);

  const attributes = ['agi', 'str', 'intel'];

  attributes.forEach((attr) => {
    const heroIndividualAttribute = document.createElement('div');
    heroIndividualAttribute.className = `hero-indivudal-attribute ${attr}`;
    heroAttributes.appendChild(heroIndividualAttribute);
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
    shuffleHero();
  });
}

function shuffleHero() {
  console.error('shuffle is not defiened');
}

function showAttributesValues() {
  const AttributesContainer = document.getElementById('attributesContainer');
  const attrValuesContainer = document.createElement('div');
  attrValuesContainer.className = 'attr-values-container';
  AttributesContainer.appendChild(attrValuesContainer)
  const heroAttributesValues = {
    agi: currentHero.agi,
    str: currentHero.str,
    intel: currentHero.intel,
  };


  Object.keys(heroAttributesValues).forEach((attr) => {
    const attrValue = document.createElement('div');
    attrValue.className = 'attr-value'
    attrValue.textContent = heroAttributesValues[attr];
    attrValuesContainer.appendChild(attrValue);
  });
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
    const shuffleContainer = document.getElementById('shuffleContainer');
    shuffleContainer.style.display = 'none';
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

function renderAttributesContainer() {
  const attributesContainer = document.createElement('div');
  attributesContainer.className = 'attributes-container';
  attributesContainer.id = 'attributesContainer';
  const heroCard = document.getElementById('heroCard');
  heroCard.appendChild(attributesContainer);
}
