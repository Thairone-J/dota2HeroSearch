import { heroes } from './heroes.js';

const createHeroButton = document.getElementById('createHeroButton');
const heroSearchContainer = document.getElementById('heroSearchContainer');
const searchBar = document.getElementById('searchBar');

document.getElementById('createHeroButton').addEventListener('click', function () {
  createHero();
});

document.getElementById('searchButton').addEventListener('click', function () {
  searchHero();
});

function createHero() {
  renderHeroCard();
}

function searchHero() {
  let searchPreview = document.getElementById('searchPreview');

  if (!searchPreview) {
    createHeroButton.style.display = 'none';

    searchPreview = document.createElement('div');
    searchPreview.id = 'searchPreview';
    searchPreview.className = 'search-preview';
    heroSearchContainer.insertBefore(searchPreview, searchBar);

    const result = document.createElement('div');
    result.className = 'result';

    const result2 = document.createElement('div');
    result2.className = 'result2';

    const result3 = document.createElement('div');
    result3.className = 'result3';

    searchPreview.append(result, result2, result3);
  }

  searchBar.style.animation = 'slideDown 0.5s ease-out forwards';
}

function renderHeroCard() {
  searchBar.style.animation = 'slideDown2 0.7s ease-out forwards';

  const createHeroSection = document.createElement('div');
  createHeroSection.id = 'createHeroSection';
  createHeroSection.className = 'create-hero-section';

  createHeroButton.style.display = 'none';

  heroSearchContainer.insertBefore(createHeroSection, searchBar);

  const heroSkills = document.createElement('div');
  heroSkills.className = 'hero-skills';
  createHeroSection.appendChild(heroSkills);

  for (let i = 0; i < 4; i++) {
    const individualSkill = document.createElement('div');
    individualSkill.className = 'individual-skill';
    heroSkills.appendChild(individualSkill);
  }

  const heroAttributes = document.createElement('div');
  heroAttributes.className = 'hero-attributes';
  createHeroSection.insertBefore(heroAttributes, heroSkills);

  for (let i = 0; i < 3; i++) {
    const heroIndividualAttribute = document.createElement('div');
    heroIndividualAttribute.className = 'hero-indivudal-attribute';
    heroAttributes.appendChild(heroIndividualAttribute);
  }

  const shuffleContainer = document.createElement('div');
  shuffleContainer.className = 'shuffle-container';

  createHeroSection.append(shuffleContainer);

  const heroShuffleIcon = document.createElement('i');
  heroShuffleIcon.className = 'hero-shuffle-icon material-icons shuffle';
  heroShuffleIcon.textContent = 'shuffle';
  shuffleContainer.append(heroShuffleIcon);

  const heroPictureWraper = document.createElement('div');
  heroPictureWraper.className = 'hero-picture-wraper';
  createHeroSection.insertBefore(heroPictureWraper, heroAttributes);

  const heroPicture = document.createElement('div');
  heroPicture.className = 'hero-picture';

  heroPictureWraper.append(heroPicture);
}
