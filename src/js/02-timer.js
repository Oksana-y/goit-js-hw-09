// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
let intervalId;

flatpickr(refs.input, options);

const countTime = () => {
  const countdown = new Date(refs.input.value) - new Date();
    if (countdown <= 0) {
    clearInterval(intervalId);
    refs.btnStart.setAttribute('disabled', true);
    alert('Please choose a date in the future');
    return;
  } else {
    refs.btnStart.removeAttribute('disabled');
  }
  const counterArr = convertMs(countdown);
  console.log(counterArr);
  refs.days.textContent = counterArr.days;
  refs.hours.textContent = counterArr.hours;
  refs.minutes.textContent = counterArr.minutes;
  refs.seconds.textContent = counterArr.seconds;
};

refs.input.addEventListener('focus', () => {
  if (refs.input.value === '') {
    clearInterval(intervalId);
    refs.btnStart.setAttribute('disabled', true);
    alert('Please choose a date in the future');
  } else {
    refs.btnStart.removeAttribute('disabled');
  }
});

refs.btnStart.addEventListener('click', () => {
  
  intervalId = setInterval(() => {
    countTime();
  }, 1000);
  
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
// 
  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
