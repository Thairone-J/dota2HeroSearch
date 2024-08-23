import { handleBottomClick, handleTopClick } from './loginPage.js';
import { register, login } from './auth.js';
import { chooseProfilePicture } from './profilePicture.js';
import { state } from '../script.js';

const form = {
  render: (element, btnText) => {
    const popupTop = document.getElementById('popupTop');
    const popupBottom = document.getElementById('popupBottom');
    popupTop.removeEventListener('click', handleTopClick);
    popupBottom.removeEventListener('click', handleBottomClick);

    const form = document.createElement('form');
    form.id = 'loginForm';
    form.className = 'login-form';

    const usernameInput = document.createElement('input');
    usernameInput.id = 'usernameInput';
    usernameInput.className = 'username-input';
    usernameInput.type = 'text';
    usernameInput.name = 'username';
    usernameInput.placeholder = 'Username';

    const passwordInput = document.createElement('input');
    passwordInput.id = 'pwInput';
    passwordInput.className = 'password-input';
    passwordInput.type = 'password';
    passwordInput.name = 'password';
    passwordInput.placeholder = 'Password';

    const submitButton = document.createElement('button');
    submitButton.className = 'btn-form-login';
    submitButton.type = 'button';
    submitButton.textContent = btnText;

    const profilePicture = document.getElementById('profilePicture');

    switch (btnText) {
      case 'LOGIN':
        profilePicture.style.cursor = 'default';
        profilePicture.src = `../images/default_pp.jpg`;

        submitButton.addEventListener('click', () => {
          const username = getValues.username();
          const password = getValues.password();
          login(username, password);
        });
        break;
      case 'REGISTER':
        profilePicture.addEventListener('click', chooseProfilePicture);

        submitButton.addEventListener('click', () => {
          const username = getValues.username();
          const password = getValues.password();
          const picture = getValues.picture();
          if ((username, password, picture)) {
            register(username, password, picture);
          }
        });
        break;

      default:
        console.error('Missing Arguments..');
        return;
    }

    form.append(usernameInput, passwordInput, submitButton);

    element.innerHTML = '';
    element.classList.remove('register-bottom');

    element.appendChild(form);
  },
};

const getValues = {
  username: () => {
    return String(document.getElementById('usernameInput').value);
  },
  password: () => {
    return String(document.getElementById('pwInput').value);
  },
  picture: () => {
    if (state.userProfilePicture === 'images/default_pp.jpg') {
      console.error('Choice a profile picture.');
      return null;
    }

    return state.userProfilePicture;
  },
};

export default form;
