user;

function Login() {
    var text = document.getElementById("failedLogin");
    if(text.classList.contains("this-is-hidden")) {
    }
    else {
        text.classList.add("this-is-hidden");
    }
    credentials = {};
    credentials.username = document.getElementById("username").value;
    credentials.password = document.getElementById("password").value;

    SendData(2, credentials);
}

function UserInfo() {
    this.user = window.localStorage.getItem("user");
}