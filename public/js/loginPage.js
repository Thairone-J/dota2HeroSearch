import form from './form.js';
import profilePicture from './profilePicture.js';

const loginPage = {
  render: () => {
    const body = document.body;

    const hasContainer = document.getElementById('bgContainerLogin');

    if (!hasContainer) {
      const backgroundContainer = document.createElement('div');
      backgroundContainer.id = 'bgContainerLogin';
      backgroundContainer.className = 'bg-container-login';

      const popup = document.createElement('div');
      popup.id = 'loginPopup';
      popup.className = 'login-popup';

      body.append(backgroundContainer);

      const popupTop = document.createElement('div');
      popupTop.id = 'popupTop';
      popupTop.className = 'popup-top';
      popupTop.classList.add('login-top');
      const popupBottom = document.createElement('div');
      popupBottom.id = 'popupBottom';
      popupBottom.className = 'popup-bottom';
      popupBottom.classList.add('register-bottom');
      popup.append(popupTop, popupBottom);
      popupTop.textContent = 'LOGIN';
      popupBottom.textContent = 'REGISTER';

      popupTop.addEventListener('click', handleTopClick);
      popupBottom.addEventListener('click', handleBottomClick);

      const closeIcon = document.createElement('img');
      closeIcon.className = 'close-icon';
      closeIcon.src = '../images/icons/xclose.svg';
      closeIcon.addEventListener('click', () => {
        closePopup(backgroundContainer);
      });

      backgroundContainer.append(popup, closeIcon);
    }
  },
};

export const handleTopClick = () => {
  profilePicture.render(popupTop);
  form.render(popupBottom, 'LOGIN');

};

export const handleBottomClick = () => {
  profilePicture.render(popupTop);

  form.render(popupBottom, 'REGISTER');
};

function closePopup(container) {
  container.remove();
}

export default loginPage;
