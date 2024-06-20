import { heroes } from './heroes.js';

const showHeroEditorButton = document.getElementById('showHeroEditorButton');
const heroPreviewContainer = document.getElementById('heroPreviewContainer');
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
  const heroCard = document.createElement('div');
  heroCard.className = 'hero-card';
  heroCard.id = 'heroCard';

  const searchPreview = document.getElementById('searchPreview');
  const searchBar = document.getElementById('searchBar');
  const showHeroEditorButton = document.getElementById('showHeroEditorButton');
  const heroPreviewContainer = document.getElementById('heroPreviewContainer');

  const elements = [searchPreview, searchBar, showHeroEditorButton];

  elements.forEach((element) => {
    if (element) {
      element.style.display = 'none';
    }
  });

  heroPreviewContainer.appendChild(heroCard);
  renderSkills();
  renderAttributes();
  renderShuffleButton();
  renderPicture();
}

function renderSkills() {
  const heroCard = document.getElementById('heroCard');
  const heroSkills = document.createElement('div');
  heroSkills.className = 'hero-skills';
  heroSkills.id = 'heroSkills';
  heroCard.appendChild(heroSkills);

  for (let i = 0; i < 4; i++) {
    const individualSkill = document.createElement('div');
    individualSkill.className = 'individual-skill';
    heroSkills.appendChild(individualSkill);
  }
}

function renderAttributes() {
  const heroCard = document.getElementById('heroCard');
  const heroSkills = document.getElementById('heroSkills');
  const heroAttributes = document.createElement('div');
  heroAttributes.className = 'hero-attributes';
  heroAttributes.id = 'heroAttributes';
  heroCard.insertBefore(heroAttributes, heroSkills);

  for (let i = 0; i < 3; i++) {
    const heroIndividualAttribute = document.createElement('div');
    heroIndividualAttribute.className = 'hero-indivudal-attribute';
    heroAttributes.appendChild(heroIndividualAttribute);
  }
}

function renderShuffleButton() {
  const heroCard = document.getElementById('heroCard');

  const shuffleContainer = document.createElement('div');
  shuffleContainer.className = 'shuffle-container';

  heroCard.append(shuffleContainer);

  const heroShuffleIcon = document.createElement('i');
  heroShuffleIcon.className = 'hero-shuffle-icon material-icons shuffle';
  heroShuffleIcon.textContent = 'shuffle';
  shuffleContainer.append(heroShuffleIcon);
}

function renderPicture() {
  const heroCard = document.getElementById('heroCard');
  const heroAttributes = document.getElementById('heroAttributes');
  const heroPictureWraper = document.createElement('div');
  heroPictureWraper.className = 'hero-picture-wraper';
  heroCard.insertBefore(heroPictureWraper, heroAttributes);

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
    heroPreviewContainer.insertBefore(searchPreview, searchBar);

    for (let i = 0; i < 3; i++) {
      const result = document.createElement('div');
      result.className = 'result';
      result.id = 'result';

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

      result.addEventListener('click', function () {
        renderHeroCard();
      });
    }
  }
  searchBar.style.animation = 'slideDown 0.5s ease-out forwards';
}
