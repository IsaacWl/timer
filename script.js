class Counter {
  constructor(time = {}) {
    this.mode = null;
    this.resetButton = document.querySelector('#reset');
    this.stopButton = document.querySelector('#stop');
    this.startButton = document.querySelector('#start');
    this.editButton = document.querySelector('#edit');
    this.cancelEditButton = document.querySelector('#cancel');
    this.confirmEditButton = document.querySelector('#confirm');

    this.hours = document.querySelector('#hours');
    this.minutes = document.querySelector('#minutes');
    this.seconds = document.querySelector('#seconds');

    if (!time.hours) time.hours = 0;
    if (!time.minutes) time.minutes = 0;
    if (!time.seconds) time.seconds = 0;
    if (!time.hours && !time.minutes && !time.seconds) time.minutes = 25;

    this.time = time;
    this.timeMs = 0;

    this.ms = 0;

    this.config();
    this.resetButton.disabled = true;
  }

  config() {
    this.events();
    this.setTimer(this.time);
    this.setHTML();
  }

  events() {
    this.startButton.addEventListener('click', (ev) => this.start(ev));
    this.stopButton.addEventListener('click', (ev) => this.stop(ev));
    this.resetButton.addEventListener('click', () => this.reset());
    this.editButton.addEventListener('click', () => this.toggleEdit());
    this.cancelEditButton.addEventListener('click', () => this.toggleEdit());
    this.confirmEditButton.addEventListener('click', () => this.confirmEdit());
  }

  start(ev) {
    const button = ev.target;
    button.classList.toggle('none');
    this.stopButton.classList.toggle('none');
    this.resetButton.disabled = false;
    this.editButton.disabled = true;
    this.mode = 'start';
    this.startTimer();
    if (this.timeMs === 0) this.timeMs = this.ms;
  }

  stop(ev) {
    const button = ev.target;
    button.classList.toggle('none');
    this.resetButton.disabled = true;
    this.editButton.disabled = false;
    this.startButton.classList.toggle('none');
    clearInterval(this.timer);
  }

  reset() {
    this.resetButton.disabled = true;
    this.editButton.disabled = false;
    this.timeMs = this.ms;
    this.stopButton.classList.toggle('none');
    this.startButton.classList.toggle('none');
    this.setHTML();
    clearInterval(this.timer);
  }

  confirmEdit() {
    const hours = document.querySelector('#hours-field').value;
    const minutes = document.querySelector('#minutes-field').value;
    const seconds = document.querySelector('#seconds-field').value;
    if (
      !hours.trim() ||
      !minutes.trim() ||
      !seconds.trim() ||
      hours.trim().length > 2 ||
      minutes.trim().length > 2 ||
      seconds.trim().length > 2 ||
      +hours < 0 ||
      +minutes < 0 ||
      +seconds < 0
    )
      return;
    const time = { hours, minutes, seconds };
    this.setTimer(time);
    this.toggleEdit();
    this.setHTML();
  }

  toggleEdit() {
    document.querySelector('#shadow').classList.toggle('none');
    document.querySelector('#modal').classList.toggle('none');
  }

  startTimer() {
    this.timer = setInterval(() => {
      // if (this.mode === 'reset') {
      //   return;
      // }

      if (this.timeMs <= 0) {
        clearInterval(this.timer);
        this.stopButton.classList.toggle('none');
        this.startButton.classList.toggle('none');
        return;
      }
      // if (this.timeMs <= 0) {
      // }
      this.timeMs -= 1000;
      this.setHTML();
    }, 1000);
  }

  setHTML() {
    this.hours.innerHTML = `${this.msToHours(this.timeMs)}`.padStart(2, '0');
    this.minutes.innerHTML = `${this.msToMinutes(this.timeMs)}`.padStart(
      2,
      '0'
    );
    this.seconds.innerHTML = `${this.msToSeconds(this.timeMs)}`.padStart(
      2,
      '0'
    );
  }
  setTimer(time) {
    const hours = this.hoursToMs(time.hours);
    const minutes = this.minutesToMs(time.minutes);
    const seconds = this.secondsToMs(time.seconds);
    const total = hours + minutes + seconds;

    this.timeMs = total;
    this.ms = total;
  }
  msToHours(ms) {
    return Math.floor((ms / (1000 * 60 * 60)) % 24);
  }
  msToMinutes(ms) {
    return Math.floor((ms / (1000 * 60)) % 60);
  }
  msToSeconds(ms) {
    return Math.floor((ms / 1000) % 60);
  }
  hoursToMs(hours) {
    return hours * 60 * 60 * 1000;
  }
  minutesToMs(minutes) {
    return minutes * 60 * 1000;
  }
  secondsToMs(seconds) {
    return seconds * 1000;
  }
}

const counter = new Counter({ minutes: '05' });
