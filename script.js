import { heroes } from './heroes.js';

const showHeroEditorButton = document.getElementById('showHeroEditorButton');
const heroSearchContainer = document.getElementById('heroSearchContainer');
const searchBar = document.getElementById('searchBar');

document.getElementById('showHeroEditorButton').addEventListener('click', function () {
  showHeroEditor();
});

document.getElementById('searchButton').addEventListener('click', function () {
  searchHero();
});

function showHeroEditor() {
  renderHeroCard();
}

function searchHero() {
  renderSearchPreview();
}

function renderHeroCard() {
  searchBar.style.animation = 'slideDown2 0.7s ease-out forwards';

  const heroEditorSection = document.createElement('div');
  heroEditorSection.id = 'heroEditorSection';
  heroEditorSection.className = 'hero-editor-section';

  showHeroEditorButton.style.display = 'none';

  heroSearchContainer.insertBefore(heroEditorSection, searchBar);

  const heroSkills = document.createElement('div');
  heroSkills.className = 'hero-skills';
  heroEditorSection.appendChild(heroSkills);

  for (let i = 0; i < 4; i++) {
    const individualSkill = document.createElement('div');
    individualSkill.className = 'individual-skill';
    heroSkills.appendChild(individualSkill);
  }

  const heroAttributes = document.createElement('div');
  heroAttributes.className = 'hero-attributes';
  heroEditorSection.insertBefore(heroAttributes, heroSkills);

  for (let i = 0; i < 3; i++) {
    const heroIndividualAttribute = document.createElement('div');
    heroIndividualAttribute.className = 'hero-indivudal-attribute';
    heroAttributes.appendChild(heroIndividualAttribute);
  }

  const shuffleContainer = document.createElement('div');
  shuffleContainer.className = 'shuffle-container';

  heroEditorSection.append(shuffleContainer);

  const heroShuffleIcon = document.createElement('i');
  heroShuffleIcon.className = 'hero-shuffle-icon material-icons shuffle';
  heroShuffleIcon.textContent = 'shuffle';
  shuffleContainer.append(heroShuffleIcon);

  const heroPictureWraper = document.createElement('div');
  heroPictureWraper.className = 'hero-picture-wraper';
  heroEditorSection.insertBefore(heroPictureWraper, heroAttributes);

  const heroPicture = document.createElement('div');
  heroPicture.className = 'hero-picture';

  heroPictureWraper.append(heroPicture);
}

function renderSearchPreview() {
  let searchPreview = document.getElementById('searchPreview');

  if (!searchPreview) {
    showHeroEditorButton.style.display = 'none';

    searchPreview = document.createElement('div');
    searchPreview.id = 'searchPreview';
    searchPreview.className = 'search-preview';
    heroSearchContainer.insertBefore(searchPreview, searchBar);

    for (let i = 0; i < 3; i++) {
      const result = document.createElement('div');
      result.className = 'result';
      searchPreview.appendChild(result);

      const resultPictureSection = document.createElement('div');
      resultPictureSection.className = 'result-picture-section';
      result.appendChild(resultPictureSection);

      const resultPicture = document.createElement('div');
      resultPicture.className = 'result-picture';
      resultPictureSection.appendChild(resultPicture);

      const resultTitleSection = document.createElement('div');
      resultTitleSection.className = 'result-title-section';
      result.appendChild(resultTitleSection);

      const resultTitle = document.createElement('div');
      resultTitle.className = 'result-title';
      resultTitleSection.appendChild(resultTitle);
    }
  }
  searchBar.style.animation = 'slideDown 0.5s ease-out forwards';
}
