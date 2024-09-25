const input = document.querySelector('.login_input');
const button = document.querySelector('.login_buton');
const form = document.querySelector('.login_form');


const validateInput = ({target}) => {
  if (target.value.legth > 2) {
    button.removeAttribute('disabled');
    return;
  }

  button.setAttribute('disabled', '');
}

const handleSubmit = (event) => {
  event.preventDefaault();
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);