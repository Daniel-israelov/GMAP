if (sessionStorage.getItem("user") != null) {
    switch_links('signup-ref', "חשבון", "../html/user_settings.html", "profile-ref");
    switch_links('login-ref', "התנתק", "../html/user_settings.html", "logout-ref");
}

function logout(e) {
    e.preventDefault();
    if (confirm('האם אתה בטוח שברצונך להתנתק?')) {
        sessionStorage.clear();
        switch_links('signup-ref', "הרשמה", "signup.html");
        switch_links('login-ref', "התחברות", "login.html");
        window.location.reload();
    } else {
        //nothing to do here!
    }
}

function switch_links(element_id, text, link_ref, new_id) {
    let elem = document.getElementById(element_id);
    elem.textContent = text;
    elem.style.fontSize = "115%"
    elem.setAttribute("href", link_ref);

    if (new_id == "logout-ref") {
        elem.addEventListener('click', logout);
    }
}