import '@fortawesome/fontawesome-free/js/all.js';
import Score from './score.js';

import('./style/style.css');
const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';

class Game {
  static displayScore = (userInfo) => {
    const ul = document.querySelector('.board-items');
    const li = document.createElement('li');
    li.innerHTML = `
    <span>${userInfo.user}  </span><span>${userInfo.score}</span>
    `;
    ul.appendChild(li);
  };

  static addScore = (event) => {
    event.preventDefault();
    const user = document.querySelector('#name').value;
    const score = document.querySelector('#score').value;

    if (user && score) {
      const data = new Score(user, score);
      Game.createScore(`${url}Zl4d7IVkecOTTVg2fUdz/scores/`, data).then(
        (res) => {
          const message = document.querySelector('.message');
          if (res) {
            message.style.display = 'flex';
            message.innerHTML = `
        <div class="close"><i class="fas fa-close"></i></div>
        <span class="text">${res.result}</span> `;

            setTimeout(() => {
              message.style.display = 'none';
            }, 2000);
          } else {
            message.style.display = 'none';
          }
          document
            .querySelector('.message .close')
            .addEventListener('click', () => {
              message.style.display = 'none';
            });
        },
      );

      Game.clearInputs();
    }
  };

  static refreshScore = () => {
    fetch(`${url}Zl4d7IVkecOTTVg2fUdz/scores/`)
      .then((res) => res.json())
      .then((data) => {
        const ul = document.querySelector('.board-items');
        ul.replaceChildren();
        data.result.forEach((score) => Game.displayScore(score));
      });
  };

  static createScore = async (url = '', data = {}) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  };

  static clearInputs = () => {
    document.querySelector('#name').value = '';
    document.querySelector('#score').value = '';
  };
}

document.querySelector('#refresh').addEventListener('click', Game.refreshScore);

document
  .querySelector('#form-container')
  .addEventListener('submit', Game.addScore);
document.addEventListener('DOMContentLoaded', Game.refreshScore);
