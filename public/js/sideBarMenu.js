import { renderLoginContainer } from './loginSection.js';

export function renderSideBarMenu() {
  const appContainer = document.getElementById('mainContainer');
  const existingContainer = document.getElementById('menuMaskContainer');

  if (existingContainer) {
    appContainer.removeChild(existingContainer);
  } else {
    const container = document.createElement('div');
    container.id = 'sideMenuContainer';
    container.className = 'side-menu-container';
    const menuMaskContainer = document.createElement('div');
    menuMaskContainer.className = 'menu-mask-container';
    menuMaskContainer.id = 'menuMaskContainer';
    menuMaskContainer.appendChild(container);
    appContainer.appendChild(menuMaskContainer);
    renderLoginContainer();
  }
}
