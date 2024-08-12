import { login, register } from './auth.js';
import { renderHeroesList } from './heroesList.js';

export function renderLoginContainer() {
  const token = localStorage.getItem('token');

  const newLoginContainer = document.createElement('div');
  newLoginContainer.className = 'login-container';
  newLoginContainer.id = 'loginContainer';

  const sideMenuContainer = document.getElementById('sideMenuContainer');
  const inputContainer = document.createElement('div');
  inputContainer.className = 'input-container';
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'buttons-container';
  buttonsContainer.id = 'buttonsContainer';

  sideMenuContainer.append(newLoginContainer);
  newLoginContainer.append(inputContainer, buttonsContainer);

  if (!token) {
    const loginInput = document.createElement('input');
    loginInput.id = 'loginInput';
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'passwordInput';
    inputContainer.append(loginInput, passwordInput);

    const loginButton = document.createElement('div');
    loginButton.className = 'login-button';
    loginButton.id = 'loginButton';
    loginButton.textContent = 'Login';
    loginButton.addEventListener('click', () => {
      const username = document.getElementById('loginInput').value.toLowerCase();
      const password = document.getElementById('passwordInput').value;

      login(username, password);
    });

    const signInButton = document.createElement('div');
    signInButton.className = 'signin-button';
    signInButton.id = 'signInButton';
    signInButton.textContent = 'Sign in';
    signInButton.addEventListener('click', () => {
      const username = document.getElementById('loginInput').value.toLowerCase();
      const password = document.getElementById('passwordInput').value;

      register(username, password);
    });

    buttonsContainer.append(loginButton, signInButton);
  } else {
    const userPicture = document.createElement('div');
    userPicture.className = 'user-picture';
    const icon = document.createElement('img');
    icon.src = '../images/icons/image.svg';
    userPicture.appendChild(icon);
    userPicture.addEventListener('mouseover', () => (icon.style.opacity = 1));
    userPicture.addEventListener('mouseout', () => (icon.style.opacity = 0));
    userPicture.addEventListener('click', () => renderHeroesList('changeUserPicture'));

    const myHeroesButton = document.createElement('div');
    myHeroesButton.textContent = 'My Heroes';
    myHeroesButton.addEventListener('click', () => renderHeroesList('showUserHeroes'));
    inputContainer.appendChild(userPicture);
    buttonsContainer.appendChild(myHeroesButton);
  }
}
