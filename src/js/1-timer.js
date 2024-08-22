import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startTimerBtn = document.querySelector('button[data-start]');
const inputEl = document.querySelector('#datetime-picker');

const daysCounter = document.querySelector('.value[data-days]');
const hoursCounter = document.querySelector('.value[data-hours]');
const minutesCounter = document.querySelector('.value[data-minutes]');
const secondsCounter = document.querySelector('.value[data-seconds]');

let userSelectedDate = 0;

flatpickr(inputEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const diffTime = selectedDates[0] - Date.now();
    if (diffTime > 0) {
      startTimerBtn.disabled = false;
      userSelectedDate = selectedDates[0];
    } else {
      startTimerBtn.disabled = true;
      iziToast.info({
        titleSize: '16px',
        titleLineHeight: 1.5,
        message: 'Please choose a date in the future',
        messageSize: '12px',
        messageLineHeight: 1.5,
        backgroundColor: '#EF4040',
        iconUrl: './img/x.svg',
        iconColor: '#fff',
        position: 'topRight',
        close: false,
        theme: 'dark',
        closeOnEscape: true,
        closeOnClick: true,
        transitionIn: 'bounceInDown',
        transitionOut: 'fadeOutUp',
        progressBar: false,
      });
    }
  },
});
startTimerBtn.addEventListener('click', timerEl);

function timerEl(ex) {
  ex.target.disabled = true;
  inputEl.disabled = true;
  const intervalEl = setInterval(() => {
    const diffTime = userSelectedDate - Date.now();
    if (diffTime <= 0) {
      clearInterval(intervalEl);
      inputEl.disabled = false;
      return;
    }
    const timeValues = convertMs(diffTime);

    secondsCounter.textContent = addLeadingZero(timeValues.seconds);
    minutesCounter.textContent = addLeadingZero(timeValues.minutes);
    hoursCounter.textContent = addLeadingZero(timeValues.hours);
    daysCounter.textContent = addLeadingZero(timeValues.days);
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
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
