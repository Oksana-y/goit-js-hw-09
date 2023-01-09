import Notiflix from 'notiflix';

refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const delay = +e.currentTarget.elements.delay.value;
  const step = +e.currentTarget.elements.step.value;
  const amount = +e.currentTarget.elements.amount.value;
    
  for (let i = 1; i <= amount; i += 1) {
    if (i === 1) {
      createPromise(i, delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
    } else {
      createPromise(i + 1, delay + step)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
    }
  }
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
