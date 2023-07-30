import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('form'),
};

const formClassName = refs.form.className.toString();

const formData = new FormData(refs.form);
const promise = null;

formData.forEach((value, name) => {
  refs[name] = refs.form.querySelector(`.${formClassName} [name="${name}"]`);
});
// console.log(refs);

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  let delay = Number(refs.delay.value);
  const step = Number(refs.step.value);
  // console.log(refs.amount.value);
  let maxDelay = delay + (Number(refs.amount.value) - 1) * step;
  for (let i = 1; i <= Number(refs.amount.value); i += 1) {
    createPromise(i, delay, maxDelay);
    delay += step;
    maxDelay -= step;
  }
}

function createPromise(position, delay, maxDelay) {
  // console.log(`${position}  ${delay}`);
  setTimeout(() => {
    new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    })
      .then(result => {
        Notiflix.Notify.success(result, {
          timeout: maxDelay,
        });
      })
      .catch(error => {
        Notiflix.Notify.failure(error, {
          timeout: maxDelay,
        });
      });
  }, delay);
}
