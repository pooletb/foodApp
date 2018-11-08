function Register() {
    var text = document.getElementById("userExists");
    if(text.classList.contains("this-is-hidden")) {
    }
    else {
        text.classList.add("this-is-hidden");
    }
    credentials = {};
    credentials.username = document.getElementById("username").value;
    credentials.password = document.getElementById("password").value;

    SendData(1, credentials);
}