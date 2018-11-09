function Guest () {
    window.localStorage.setItem("user", "guest");
    document.location.href = ("/guestportal")
}