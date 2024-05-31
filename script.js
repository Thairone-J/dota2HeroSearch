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
  const createHeroSection = document.createElement('div');
  createHeroSection.id = 'createHeroSection';
  createHeroSection.className = 'create-hero-section';

  createHeroButton.style.display = 'none';

  heroSearchContainer.insertBefore(createHeroSection, searchBar);

  const heroSkills = document.createElement('div');
  heroSkills.className = 'hero-skills';

  const individualSkill1 = document.createElement('div');
  individualSkill1.className = 'individual-skill';

  const individualSkill2 = document.createElement('div');
  individualSkill2.className = 'individual-skill';

  const individualSkill3 = document.createElement('div');
  individualSkill3.className = 'individual-skill';

  const individualSkill4 = document.createElement('div');
  individualSkill4.className = 'individual-skill';

  createHeroSection.appendChild(heroSkills);

  heroSkills.append(individualSkill1, individualSkill2, individualSkill3, individualSkill4);

  const heroAttributes = document.createElement('div');
  heroAttributes.className = 'hero-attributes';

  createHeroSection.insertBefore(heroAttributes, heroSkills);

  const heroIndividualAttribute1 = document.createElement('div');
  heroIndividualAttribute1.className = 'hero-indivudal-attribute';

  const heroIndividualAttribute2 = document.createElement('div');
  heroIndividualAttribute2.className = 'hero-indivudal-attribute';

  const heroIndividualAttribute3 = document.createElement('div');
  heroIndividualAttribute3.className = 'hero-indivudal-attribute';

  heroAttributes.append(
    heroIndividualAttribute1,
    heroIndividualAttribute2,
    heroIndividualAttribute3
  );

  const heroPicture = document.createElement('div');
  heroPicture.className = 'hero-picture';

  createHeroSection.append(heroPicture);
}

function searchHero() {
  let searchPreview = document.getElementById('searchPreview');

  if (!searchPreview) {
    createHeroButton.style.display = 'none';

    searchPreview = document.createElement('div');
    searchPreview.id = 'searchPreview';
    searchPreview.className = 'search-preview';
    heroSearchContainer.insertBefore(searchPreview, searchBar);
  }

  searchBar.style.animation = 'slideDown 0.5s ease-out forwards';
}
