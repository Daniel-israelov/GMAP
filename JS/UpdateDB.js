import { database } from "./firebase-config.js";
import { ref, update, child, get } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js";

document.getElementById("update-form").addEventListener("submit", onSubmit)

const uid = sessionStorage.getItem("user");

const dbRef = ref(database);
get(child(dbRef, `users/${uid}`)).then((snapshot) => {
    //fills fields info according to values in database
    if (snapshot.exists()) {
        document.getElementById("name").value = snapshot.val()['garage_name']
        document.getElementById("address").value = snapshot.val()['address']
        document.getElementById("city").value = snapshot.val()['city']
        document.getElementById("phone").value = snapshot.val()['phone']
        document.getElementById("services").value = snapshot.val()['services']
        document.getElementById("admin").value = snapshot.val()['garage_manager']
    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});


function onSubmit(e) {
    e.preventDefault()

    const form = document.getElementById("update-form").getElementsByTagName("input");
    let flag = false;

    for (let i = 0; i < form.length; i++) {
        //checking if there is at least 1 blank field
        if (form[i].value == '') {
            document.querySelector('.alert_fail').style.display = 'block';
            setTimeout(function () {
                document.querySelector('.alert_fail').style.display = 'none';
            }, 3000);
            break;
        }
        if (i == form.length - 1) {
            flag = true;
        }
    }

    if (flag) {//if all fields are filled
        update(ref(database, 'users/' + uid), {
            garage_name: document.getElementById("name").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            phone: document.getElementById("phone").value,
            services: document.getElementById("services").value,
            garage_manager: document.getElementById("admin").value,
        });

        // Show alert
        document.querySelector('.alert_pass').style.display = 'block';
        setTimeout(function () {
            document.querySelector('.alert_pass').style.display = 'none';
        }, 3000);
    }

}
