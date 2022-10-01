// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

const currentTime = new Date();
btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= currentTime) {
      // window.alert('Please choose a date in the  future');
      Notify.failure('Please choose a date in the  future');
    } else {
      btnStart.disabled = false;
    }
  },
};

flatpickr(input, options);
btnStart.addEventListener('click', startClick);

let timerId = null;

function startClick() {
  btnStart.disabled = true;
  timerId = setInterval(() => {
    const currentDate = new Date();
    const inputDate = new Date(input.value);
    const timeSubtraction = inputDate - currentDate;
    // console.log(timeSubtraction);
    const time = convertMs(timeSubtraction);
    updateTime(time);
    if (timeSubtraction < 1000) {
      clearInterval(timerId);
      Notify.success('It is a time!!!');
      //   Notify.info('It is a time!!!');
      btnStart.disabled = false;
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTime({ days, hours, minutes, seconds }) {
  dataDays.textContent = addLeadingZero(days);
  dataHours.textContent = addLeadingZero(hours);
  dataMinutes.textContent = addLeadingZero(minutes);
  dataSeconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
