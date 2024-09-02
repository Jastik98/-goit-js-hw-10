// Описаний у документації
import iziToast from 'izitoast';

// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const delayInput = document.querySelector('[name="delay"]');
  const stateInput = document.querySelector('[name="state"]:checked');

  const delay = parseInt(delayInput.value, 10);

  const promise = new Promise((resolve, reject) => {
    if (delay <= 0) {
      reject('Invalid delay value');
    } else {
      setTimeout(() => {
        stateInput.value === 'fulfilled' ? resolve(delay) : reject(delay);
      }, delay);
    }
  });

  promise
    .then(value => {
      iziToast.success({
        position: 'topRight',
        title: 'Success!',
        message: `Fulfilled promise in ${value}ms`,
      });
    })
    .catch(value => {
      iziToast.error({
        position: 'topRight',
        title: 'Error!',
        message: `Rejected promise in ${value}ms`,
      });
    });
}
