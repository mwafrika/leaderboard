import '@fortawesome/fontawesome-free/js/all.js';

import('./style/style.css');

class LeaderboardInfo {
  constructor(user, score) {
    this.user = user;
    this.score = score;
    this.arr = [];
  }
}

class UI {
  static showInfo = () => {
    const info = [];
    info.forEach((item) => UI.addBook(item));
  };

  static addBook = (userInfo) => {
    const ul = document.querySelector('.board-items');
    const li = document.createElement('li');
    li.innerHTML = `
    <span>${userInfo.user} : </span><span>${userInfo.score}</span>
    `;
    ul.appendChild(li);
  };

  static submitAction = (event) => {
    event.preventDefault();
    const user = document.querySelector('#name').value;
    const score = document.querySelector('#score').value;

    if (user && score) {
      let data = new LeaderboardInfo(user, score);
      console.log(data);
      UI.postData(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/mwaf/scores/',
        data
      ).then((data) => {
        UI.addBook(data);
        console.log(data);
      });

      //   UI.addBook(data);
    }
  };

  static getData = () => {
    fetch(
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/mwaf/scores/'
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res.result, 'Get my data');
        UI.showInfo(res.result);
        // let ar = new LeaderboardInfo();
        // ar.arr.push(res.result);
        localStorage.setItem('game', JSON.stringify(res.result));
      });
  };

  static postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  };
}

const getLocal = () => {
  return JSON.parse(localStorage.getItem('game')) || [];
};

document.querySelector('#refresh').addEventListener('click', UI.getData);

document
  .querySelector('#form-container')
  .addEventListener('submit', UI.submitAction);
document.addEventListener('DOMContentLoaded', UI.showInfo);
