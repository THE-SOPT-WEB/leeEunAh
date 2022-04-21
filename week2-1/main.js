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
  const modal = $('.modal');
  const modalBody = $('p.modal__body');

  modalBody.innerHTML = sentence;
  modal.classList.remove('hide');

  noShowEvent(modal);

  if (keep) return;

  setTimeout(function () {
    modal.classList.add('hide');
  }, 1000);
}

function noShowEvent(modal) {
  modal.addEventListener('click', function (e) {
    modal.classList.add('hide');
  });
}

function goNextLevel(score, image) {
  currentStep++;
  const scoreBoard = $('.scoreBoard');
  scoreBoard.animate([{ transform: 'scaleY(2)' }, { transform: 'scaleY(1)' }], {
    duration: 2000,
  });
  score.innerHTML = +score.innerHTML + 1;

  if (currentStep === quizList.length) {
    showModal(`<a href="/">메인으로</a>`, true);
    return;
  }

  showImg(image);
}

function showImg(image) {
  showModal('이미지 로딩 중 입니다 :)', true);
  image.src = quizList[currentStep].src;
  image.addEventListener('load', function (e) {
    $('.modal').classList.add('hide');
  });
}

function initGame({ score, image }) {
  currentStep = 0;
  score.innerText = 0;
  showImg(image);
}

function attachAnswerEvent({ score, answer, image }) {
  answer.addEventListener('click', function (e) {
    if (e.target instanceof HTMLElement) {
      const clickedAnswer = e.target.innerText;
      const realAnswer = quizList[currentStep].answer;

      if (clickedAnswer === realAnswer) {
        goNextLevel(score, image);
      } else {
        showModal('틀렸습니다!');
      }
    }
  });
}

function restartGame(gameInfo) {
  const button = $('button.buttonList__shuffle');
  button.addEventListener('click', function (e) {
    initGame(gameInfo);
    location.href = '/';
  });
}

function gameManager(gameInfo) {
  initGame(gameInfo);
  attachAnswerEvent(gameInfo);
  restartGame(gameInfo);
}

window.onload = function () {
  gameManager({
    score: $('.scoreBoard__score'),
    answer: $('ul.answer__list'),
    image: $('.imageBoard > img'),
  });
};
