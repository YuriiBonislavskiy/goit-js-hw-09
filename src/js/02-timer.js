import '../css/common.css';
import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let selectedTime = Date.now();

const refs = {
  datetimePicker1: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  remainingDays: document.querySelector('span[data-days]'),
  remainingHours: document.querySelector('span[data-hours]'),
  remainingMinutes: document.querySelector('span[data-minutes]'),
  remainingSeconds: document.querySelector('span[data-seconds]'),
};


class Timer {
  constructor({
    timeInterval,
    onTimer,
    onTimeValidationCheck,
    onTimeIntervalCalc,
    datetimePicker,
  }) {
    this.intervalId = null;
    this.timeInterval = timeInterval;
    this.onTimer = onTimer;
    this.onTimeValidationCheck = onTimeValidationCheck;
    this.onTimeIntervalCalc = onTimeIntervalCalc;
    this.datetimePicker = datetimePicker;
    this.init(selectedTime);
  }

  init(selectedTime) {
    const validationCheck = this.onTimeValidationCheck;
    // console.log(selectedTime);

    refs.startBtn.setAttribute('disabled', '');
    const options = {
      enableTime: true,
      time_24hr: true,
      defaultDate: selectedTime,
      minuteIncrement: 1,

      onClose(selectedDates) {
        // selectedTime = selectedDates[0];
        validationCheck(selectedDates[0]);
      },
    };
    const fp = flatpickr(this.datetimePicker, options);
  }

  start() {
    refs.startBtn.setAttribute('disabled', '');
    const startTime = Date.now();
    this.intervalId = setInterval(() => {
      //   const currentTime = Date.now();
      const deltaTime = this.onTimeIntervalCalc(selectedTime);
      const time = this.convertMs(deltaTime);

      const isTimer = this.onTimer(time);
      if (!isTimer) {
        // console.log(time);
        clearInterval(this.intervalId);
      }
    }, this.timeInterval);
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    // Remaining seconds
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

const timer1 = new Timer({
  timeInterval: 1000,
  onTimer: updateTimer1,
  onTimeValidationCheck: timeValidationCheck1,
  onTimeIntervalCalc: timeIntervalCalc1,
  datetimePicker: refs.datetimePicker1,
});

refs.startBtn.addEventListener('click', timer1.start.bind(timer1));

function updateTimer1({ days, hours, minutes, seconds }) {
  // console.log(days, hours, minutes, seconds);
  if (Number(seconds) < 0) {
    return false;
  }

  refs.remainingDays.textContent = days;
  refs.remainingHours.textContent = hours;
  refs.remainingMinutes.textContent = minutes;
  refs.remainingSeconds.textContent = seconds;

  if (days === '00' && hours === '00' && minutes === '00' && seconds === '00') {
    return false;
  }
  return true;
}

function timeValidationCheck1(selectedData) {
  const currentTime = Date.now();
  if (selectedData - currentTime < 0) {
    Notiflix.Notify.failure('Please choose a date in the future', {
      timeout: 2000,
    });
    timer1.init(selectedTime);
    //   selectedTime = null;
    return;
  }
  Notiflix.Notify.success(`SUCCESS! ${selectedData.toString()}`, {
    timeout: 2000,
  });
  selectedTime = selectedData;
  refs.startBtn.removeAttribute('disabled');
  console.log(selectedData.toString());
  return;
}

function timeIntervalCalc1(selectedTime) {
  const currentTime = Date.now();

  return selectedTime - currentTime;
}
