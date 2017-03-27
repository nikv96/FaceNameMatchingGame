function navTo(str) {
    if (str !== "") <% res.redirect(str) %>;
    else <% res.redirect("/") %>;
}

function login() {
    navTo('patient-menu');
}

function registerNewPatient() {
    navTo('');
}

function correctGuess() {
    navTo('correct-guess');
}

function wrongGuess() {
    navTo('wrong-guess');
}
