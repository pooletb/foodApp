function Login() {
    var text = document.getElementById("failedLogin");
    text.classList.add("this-is-hidden");

    credentials = {};
    credentials.username = document.getElementById("username").value;
    credentials.password = document.getElementById("password").value;

    SendData(2, credentials);
}