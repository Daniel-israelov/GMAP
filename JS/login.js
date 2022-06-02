import { auth, database } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-auth.js";
import { ref, update } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js";

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const dt = new Date();

            update(ref(database, 'users/' + user.uid), {
                last_login: dt,
            });
            alert('התחברות בוצעה בהצלחה');
            sessionStorage.setItem("email", email)
            sessionStorage.setItem("password", password)
            sessionStorage.setItem("user", user.uid)
            window.location.replace("../index.html")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode == 'auth/user-not-found') {
                alert('משתמש זה לא רשום במערכת');
            }
            else if (errorCode == 'auth/wrong-password') {
                alert('סיסמה שגויה');
            }
            else {
                alert('אימייל או סיסמה לא נכונים');
            }
        });
}

