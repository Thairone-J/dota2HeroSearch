import { state } from '../script.js';
import { allowOnlyNumbers, clearAttrIcons, shuffleImg } from './utilities.js';

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
  state.tmpHero = {
    id: hero.id,
    name: hero.name,
    mainAttr: hero.mainAttr,
    agi: hero.agi,
    str: hero.str,
    intel: hero.intel,
    imageVert: hero.imageVert,
  };
}

function renderPreviewContainer() {
  const heroPreviewContainer = document.createElement('div');
  heroPreviewContainer.className = 'hero-preview-container';
  heroPreviewContainer.id = 'heroPreviewContainer';
  app.appendChild(heroPreviewContainer);
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

      state.tmpHero = { ...state.tmpHero, mainAttr: attributeMap[attributeName] };
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
