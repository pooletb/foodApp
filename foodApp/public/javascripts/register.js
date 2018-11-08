function Register() {
    credentials = {}
    credentials.username = document.getElementById("username").value;
    credentials.password = document.getElementById("password").value;
    SendData(1, credentials);
}