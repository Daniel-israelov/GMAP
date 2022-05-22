import { database } from "./firebase-config.js"
import { set, ref } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js";

document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e) {
    e.preventDefault();

    const name = getInputVal('name');
    const address = getInputVal('address');
    const email = getInputVal('email');
    const phone = getInputVal('phone');
    const message = getInputVal('message');

    saveMessage(name, address, email, phone, message);

    document.getElementById('contactForm').reset();

    // Show alert
    document.querySelector('.alert').style.display = 'block';
    setTimeout(function () {
        document.querySelector('.alert').style.display = 'none';
    }, 3000);
}

//Func. to get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to Firebase
function saveMessage(name, address, email, phone, message) {
    set(ref(database, 'messages/' + phone), {
        name: name,
        address: address,
        email: email,
        phone: phone,
        message: message
    });
}