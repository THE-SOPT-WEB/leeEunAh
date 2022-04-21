import pic1 from './assets/김규민.jpeg';
import pic2 from './assets/전희선.jpeg';
import pic3 from './assets/서혜은.jpg';
import pic4 from './assets/황주희.jpeg';
import pic5 from './assets/백지연.png';

const $ = (selector) => document.querySelector(selector);

let currentStep = 0;

const quizList = [
  {
    src: pic1,
    answer: '김규민',
  },
  {
    src: pic2,
    answer: '전희선',
  },
  {
    src: pic3,
    answer: '서혜은',
  },
  {
    src: pic4,
    answer: '황주희',
  },
  {
    src: pic5,
    answer: '백지연',
  },
];

function showModal(sentence, keep) {
  const modalClassList = $('.modal').classList;
  const modalBody = $('p.modal__body');
  modalBody.innerHTML = sentence;
  modalClassList.remove('hide');

  if (keep) return;

  setTimeout(function () {
    modalClassList.add('hide');
  }, 1000);
}

function getNextLevel() {
  currentStep++;
  const score = $('.scoreBoard__score');
  score.innerHTML = +score.innerHTML + 1;

  if (currentStep === quizList.length) {
    showModal(`<a href="/">메인으로</a>`, true);
    return;
  }

  showImg();
}

function checkAnswer() {
  const clickedLi = $('ul.answer__list');
  clickedLi.addEventListener('click', function (e) {
    if (e.target instanceof HTMLElement) {
      const clickedAnswer = e.target.innerText;
      const realAnswer = quizList[currentStep].answer;
      if (clickedAnswer === realAnswer) {
        getNextLevel();
      } else {
        showModal('틀렸습니다!');
      }
    }
  });
}

function showImg() {
  const img = $('.imageBoard > img');
  img.src = quizList[currentStep].src;
}

function initGame() {
  const score = $('.scoreBoard__score');
  score.innerHTML = 0;
  currentStep = 0;
}

function restartGame() {
  const button = $('button.buttonList__shuffle');
  button.addEventListener('click', function (e) {
    initGame();
    location.href = '/';
  });
}

window.onload = function () {
  showImg();
  checkAnswer();
  restartGame();
};
