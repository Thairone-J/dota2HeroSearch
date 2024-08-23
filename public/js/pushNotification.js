import { closePopup } from './loginPage.js';

const pushNotification = {
  render: (element, msg) => {
    const existingContainer = document.getElementById('pushNotificationContainer');
    if (existingContainer) {
      existingContainer.remove();
    }
    const container = document.createElement('div');
    container.className = 'push-notification-container';
    container.id = 'pushNotificationContainer';
    const message = document.createElement('p');

    message.textContent = msg;
    container.append(message);
    element.append(container);
    setTimeout(() => {
      container.remove();
    }, 2500);
  },
};

export default pushNotification;
