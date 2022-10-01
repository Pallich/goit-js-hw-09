const refs = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};

refs.btnStart.addEventListener('click', changeColor);
refs.btnStop.addEventListener('click', stopChanges);

let timerId = null;
refs.btnStop.setAttribute('disabled', true);

function changeColor() {
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.btnStart.setAttribute('disabled', true);
  refs.btnStop.removeAttribute('disabled', true);
}

function stopChanges() {
  refs.btnStart.removeAttribute('disabled', true);
  refs.btnStop.setAttribute('disabled', true);
  clearInterval(timerId);
  timerId = 0;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
