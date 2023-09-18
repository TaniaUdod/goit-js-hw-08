import throttle from 'lodash.throttle';

const form = document.querySelector(".feedback-form");

const STORAGE_KEY = "feedback-form-state";

form.addEventListener('input', throttle(onInput, 500));
form.addEventListener('submit', onSubmit);

let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
const { email, message } = form.elements;
reloadPage();

function onInput(event) {
    formData[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function reloadPage() {
    if (formData) {
        email.value = formData.email || "";
        message.value = formData.message || "";
    }
}

function onSubmit(event) {
    event.preventDefault();
    console.log({ email: email.value, message: message.value });

    if (email.value === "" || message.value === "") {
        return alert('Please fill in all the fields!');
    }
    
    localStorage.removeItem(STORAGE_KEY);
    event.currentTarget.reset();
    formData = {};
}