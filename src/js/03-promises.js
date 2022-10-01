import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const delay = document.querySelector('[name=delay]');
const step = document.querySelector('[name=step]');
const amount = document.querySelector('[name=amount]');
let position = 0;

form.addEventListener('submit', SubmitForm);

function SubmitForm(event) {
  event.preventDefault();

  setTimeout(() => {
    for (let i = 0; i < amount.value; i += 1) {
      const totalStep = +delay.value + +step.value * i;
      position = i + 1;
      createPromise(position, totalStep)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay} ms`);
          Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay} ms`);
          Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`);
        });
    }
  }, delay.value);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
