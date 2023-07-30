const refs = {
  body: document.querySelector('body'),
  startButton: document.querySelector('button[data-start]'),
  stopButton: document.querySelector('button[data-stop]'),
};


class changeColor {
  constructor({ action }) {
    this.intervalId = null;
    this.action = action;
    this.init();
  }

  init() {
    refs.stopButton.setAttribute('disabled', '');
  }

  startRandomHexColor() {
    this.intervalId = setInterval(() => {
      const newBackground = this.getRandomHexColor();
      this.action(newBackground);
    }, 1000);
    refs.stopButton.removeAttribute('disabled');
    refs.startButton.setAttribute('disabled', '');
  }

  stopRandomHexColor() {
    clearInterval(this.intervalId);
    refs.stopButton.setAttribute('disabled', '');
    refs.startButton.removeAttribute('disabled');
  }

  getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
  }
}

const changeBodyColor = new changeColor({
  action: ChangeBodyColor,
});

refs.startButton.addEventListener(
  'click',
  changeBodyColor.startRandomHexColor.bind(changeBodyColor)
);

refs.stopButton.addEventListener(
  'click',
  changeBodyColor.stopRandomHexColor.bind(changeBodyColor)
);

function ChangeBodyColor(newBackground) {
  refs.body.style.background = newBackground;
}

