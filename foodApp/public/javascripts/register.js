function Register() {
    var text = document.getElementById("userExists");
    text.classList.add("this-is-hidden");

    credentials = {};
    credentials.username = document.getElementById("username").value;
    credentials.password = document.getElementById("password").value;

    SendData(1, credentials);
}