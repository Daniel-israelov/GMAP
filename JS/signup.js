const signupForm = document.querySelector('#signup-form');
const garageManager = document.getElementById('garage-owner');
const garageName = document.querySelector("#garage-name");
const garageAddress = document.querySelector('#address');
const garageCity = document.querySelector('#city');
const garagePhone = document.querySelector('#phone');
const datalist = document.getElementsByTagName('datalist')[0];
const xhttp = new XMLHttpRequest();
const garageInfo = [];
let services = '';

class Garage {
    constructor(gOwner, gName, gAddress, gCity, gPhone) {
        this.gOwner = gOwner;
        this.gName = gName;
        this.gAddress = gAddress;
        this.gCity = gCity;
        this.gPhone = gPhone;
    }
}

xhttp.open('GET', '../DB/israel_garages.csv');
xhttp.send();
xhttp.onload = function () {
    //this function loads all garages owners to the drop down list
    //in the 'sign-up' page.
    const gData = xhttp.responseText.split('\r\n');
    gData.shift();//removes the headers
    gData.pop(); //removes the last blank row

    for (const row in gData) {
        if (gData.hasOwnProperty.call(gData, row)) {
            const element = gData[row].split(',');
            services = element[5];
            console.log(services)
            const owner = element[6];
            const option = document.createElement('option');
            option.appendChild(document.createTextNode(`${owner}`));
            datalist.appendChild(option);
            garageInfo.push(new Garage(owner, element[0], element[2], element[3], element[4]))
        }
    }
}

document.querySelector('input').oninput = function () {
    //auto fill the disabled input fields
    //according to the selected garage owner
    for (let i = 0; i < garageInfo.length; i++) {
        if (garageInfo[i].gOwner == this.value) {
            document.getElementById('garage-name').value = garageInfo[i].gName;
            document.getElementById('address').value = garageInfo[i].gAddress;
            document.getElementById('city').value = garageInfo[i].gCity;
            document.getElementById('phone').value = garageInfo[i].gPhone;
        }
    }
}


import { auth, database } from "./firebase-config.js";
import { set, ref } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js";
import { createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-auth.js";

signupForm.addEventListener('submit', onSubmit);
function onSubmit(e) {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const manager = garageManager.value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            set(ref(database, 'users/' + user.uid), {
                garage_manager: manager,
                email: email,
                garage_name: garageName.value,
                address: garageAddress.value,
                city: garageCity.value,
                phone: garagePhone.value,
                services: services
            });

            alert('נרשמת בהצלחה\nלצורך אימות, יש להכנס לקישור שנשלח למייל');
            signupForm.reset();

            sendEmailVerification(auth.currentUser)
                .then(() => {
                    // Email verification sent!
                    // nothing to do here
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode == 'auth/email-already-in-use') {
                alert('משתמש עם כתובת מייל זה כבר קיים במערכת')
            }
            else {
                const errorMessage = "הסיסמה צריכה להכיל לפחות 6 תווים.";
                alert(errorMessage);
            }
        });
}