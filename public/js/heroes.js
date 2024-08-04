import { getInputs, renderSavedAnimation } from './utilities.js';
import { state } from '../script.js';
import { clearResult, renderHeroCard, showHero, renderHomePage } from './userInterface.js';

const BASE_URL = 'http://localhost:3000';

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

export function searchHero(queryHero) {
  if (!state.heroesDataAvaible) {
    loadHeroes();
    return;
  }
  // Could use '.filter' and list all heroes
  let result = state.defaultHeroList.find((hero) =>
    hero.name.toLowerCase().startsWith(queryHero.toLowerCase())
  );
  if (result) {
    renderResult(result);
  } else {
    clearResult();
  }
}

export async function loadHeroes() {
  state.defaultHeroList = undefined;
  try {
    const response = await fetch(`${BASE_URL}/heroes`);
    const heroes = await response.json();
    console.info('Heroes data has been requested');
    state.defaultHeroList = heroes.map((hero) => ({
      id: hero.id,
      name: hero.name,
      mainAttr: hero.main_attr,
      agi: hero.agi,
      str: hero.str,
      intel: hero.intel,
      imageVert: hero.image_vert,
    }));

    if (state.defaultHeroList.length > 0) {
      state.heroesDataAvaible = true;
      console.info('Heroes data is avaible: ' + state.heroesDataAvaible);
    } else {
      console.info('Heroes data was requested but not stored.');
    }
  } catch (error) {
    console.error('Erro ao buscar os heróis: ', error);
  }
}

export async function saveHero() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('User not logged.');
    return;
  }

  if (state.tempHero) {
    getInputs();

    const hero = {
      id: state.tempHero.id,
      name: state.tempHero.name,
      main_attr: state.tempHero.mainAttr,
      agi: state.tempHero.agi,
      str: state.tempHero.str,
      intel: state.tempHero.intel,
      image_vert: state.tempHero.imageVert,
    };

    function idExists(set, id) {
      return set.has(id);
    }
    const heroesIds = new Set(state.defaultHeroList.map((item) => item.id));
    const heroExists = idExists(heroesIds, hero.id);
    if (heroExists) {
      renderSavedAnimation();
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
    renderSavedAnimation();
    await saveNewHero(hero);
    renderHomePage();

    loadHeroes();
  }
}

async function updateHero(hero) {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('User not logged.');
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/heroes/${hero.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(hero),
    });

    const data = await response.text();
    console.info(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function saveNewHero(hero) {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('User not logged.');
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/heroes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(hero),
    });

    const data = await response.text();
    console.info(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function deleteHero() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('User not logged.');
    return;
  }
  if (!state.tempHero && !state.tempHero.id) return;
  try {
    const hero = { id: state.tempHero.id };
    const response = await fetch(`${BASE_URL}/heroes/${hero.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.text();
    console.info(data);
    renderHomePage();
    loadHeroes();
  } catch (error) {
    console.error('Error:', error);
  }
}
