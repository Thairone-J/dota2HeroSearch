import { state } from '../script.js';

export function shuffleImg() {
  const imgVert =
    state.defaultHeroList[Math.floor(Math.random() * state.defaultHeroList.length)].imageVert;
  state.tempHero = { ...state.tempHero, imageVert: imgVert };
  updateImgBg(imgVert);
}

export function updateImgBg(img) {
  const heroCard = document.getElementById('heroCard');
  heroCard.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0.163), rgba(0, 0, 0, 0.585)), url(${img})`;
}

export function clearAttrIcons() {
  const icons = document.querySelectorAll('#strengthIcon, #agilityIcon, #intelligenceIcon');
  icons.forEach((icon) => {
    icon.classList.remove('selected-attribute');
  });
}

export function allowOnlyNumbers(element) {
  element.addEventListener('input', function (e) {
    let content = e.target.innerText.replace(/\D/g, '');

    content = content === '' ? '0' : content.slice(-2);

    e.target.innerText = content;

    document.getSelection().collapse(e.target, 1);
  });
}

export function getInputs() {
  const heroPreviewContainer = document.getElementById('heroPreviewContainer');

  if (heroPreviewContainer) {
    state.tempHero = {
      ...state.tempHero,
      name: document.querySelector('.hero-name').textContent,
      agi: parseInt(document.getElementById('agilityValue').textContent, 10) || 0,
      str: parseInt(document.getElementById('strengthValue').textContent, 10) || 0,
      intel: parseInt(document.getElementById('intelligenceValue').textContent, 10) || 0,
    };
  }
}

export function renderSavedAnimation() {
  const container = document.getElementById('heroesListButtonContainer');
  const icons = ['listIcon', 'spinIcon', 'checkIcon'].map((id) => document.getElementById(id));

  icons.forEach((icon) => {
    icon.classList.remove('fadeOutIn', 'fadeInOutSpin', 'fadeInOut');
    icon.addEventListener('animationstart', () => (container.style.pointerEvents = 'none'));
    icon.addEventListener('animationend', () => (container.style.pointerEvents = 'auto'));
  });

  setTimeout(() => {
    icons[0].classList.add('fadeOutIn');
    icons[1].classList.add('fadeInOutSpin');
    icons[2].classList.add('fadeInOut');
  }, 50);
}

export function clearResult() {
  const resultContainer = document.getElementById('resultContainer');
  const result = document.getElementById('result');
  if (result) {
    result.style.animation = 'fadeOutBlur 500ms ease-out forwards';
    setTimeout(() => {
      if (result && resultContainer.contains(result)) {
        resultContainer.removeChild(result);
      }
    }, 300);
  }
}
